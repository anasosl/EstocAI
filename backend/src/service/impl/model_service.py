from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.item_service_meta import ItemServiceMeta
from src.db.__init__ import database as db
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression

def total_consumed_so_far(df_med):
    """
    Estima o total consumido ao longo de todo o histórico do medicamento,
    somando as quedas de estoque entre medições consecutivas.
    """
    df_med = df_med.sort_values('timestamp').copy()
    df_med['consumo_calc'] = df_med['quantidade'].shift(1) - df_med['quantidade']
    df_med['consumo_calc'] = df_med['consumo_calc'].apply(lambda x: x if x > 0 else 0)
    return df_med['consumo_calc'].sum()

def monthly_avg_consumption(df_med):
    """
    Calcula a média de consumo diário no último mês (30 dias) a partir da data mais recente do medicamento.
    Usa a mesma lógica de 'queda de estoque' para estimar consumo.
    """
    if df_med.empty:
        return 0.0
    max_date = df_med['timestamp'].max()
    min_date = max_date - pd.Timedelta(days=30)
    df_last_month = df_med[df_med['timestamp'].between(min_date, max_date)].copy()
    if len(df_last_month) < 2:
        return 0.0

    df_last_month = df_last_month.sort_values('timestamp')
    df_last_month['consumo_calc'] = df_last_month['quantidade'].shift(1) - df_last_month['quantidade']
    df_last_month['consumo_calc'] = df_last_month['consumo_calc'].apply(lambda x: x if x > 0 else 0)
    total_consumed_30d = df_last_month['consumo_calc'].sum()

    days_in_period = (df_last_month['timestamp'].max() - df_last_month['timestamp'].min()).days
    if days_in_period <= 0:
        return 0.0

    return total_consumed_30d / days_in_period

class ModelService(ItemServiceMeta):

    @staticmethod
    def get_prediction(id: str) -> HttpResponseModel:
        df = pd.read_csv('src/data/input_ia.csv')
        df_atas = pd.read_csv('src/data/atas_registro_precos.csv')

        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df['expiration_date'] = pd.to_datetime(df['expiration_date'])

        df_atas['data_abertura'] = pd.to_datetime(df_atas['data_abertura'])
        hoje = pd.Timestamp(datetime.today().date())

        resultados = []
        today = pd.Timestamp(datetime.today().date())

        for med_id in df['id_medicamento'].unique():
            df_med = df[df['id_medicamento'] == med_id].sort_values('timestamp').reset_index(drop=True)
            if df_med.empty or len(df_med) < 2:
                continue

            # Guarda o tipo do medicamento (supondo que a coluna "tipo" exista)
            med_tipo = df_med.iloc[0]['medicine_type'] if 'medicine_type' in df_med.columns else None

            # Identifica os pontos de reabastecimento (received_amount > 0)
            cycle_indices = df_med.index[df_med['received_amount'] > 0].tolist()
            if not cycle_indices or cycle_indices[0] != 0:
                cycle_indices = [0] + cycle_indices

            # Segmenta os ciclos: cada ciclo vai do índice de início até (mas não incluindo) o próximo reabastecimento
            cycles = []
            for i in range(len(cycle_indices) - 1):
                start_idx = cycle_indices[i]
                end_idx = cycle_indices[i+1]
                ciclo = df_med.loc[start_idx:end_idx].copy()
                if len(ciclo) >= 2:
                    cycles.append(ciclo)
            # Inclui o último ciclo (do último índice até o final)
            last_cycle = df_med.loc[cycle_indices[-1]:].copy()
            if len(last_cycle) >= 2:
                cycles.append(last_cycle)
            if len(cycles) == 0:
                continue

            # Seleciona os últimos 3 ciclos (ou menos, se não existirem 3)
            n_cycles = min(3, len(cycles))
            selected_cycles = cycles[-n_cycles:]
            taxas = []
            for ciclo in selected_cycles:
                cycle_start = ciclo.iloc[0]['timestamp']
                ciclo = ciclo.copy()
                ciclo['dias'] = (ciclo['timestamp'] - cycle_start).dt.days
                if len(ciclo) < 2:
                    continue
                X = ciclo[['dias']]
                y = ciclo['quantidade']
                modelo = LinearRegression()
                modelo.fit(X, y)
                slope = modelo.coef_[0]
                if slope < 0:
                    taxas.append(abs(slope))
            if len(taxas) == 0:
                continue
            avg_consumption_rate = np.mean(taxas)

            # Usa o ciclo mais recente para as datas e validade
            ciclo_recente = cycles[-1].copy()
            cycle_start_date = ciclo_recente.iloc[0]['timestamp']
            current_stock = ciclo_recente.iloc[-1]['quantidade']
            lot_expiration = ciclo_recente.iloc[0]['expiration_date']

            # Estima o tempo até esgotamento (em dias) com a taxa média
            t_exhaust = current_stock / avg_consumption_rate
            exhaustion_date = ciclo_recente.iloc[-1]['timestamp'] + timedelta(days=t_exhaust)

            # Data ideal de chegada do novo lote: 15 dias antes do esgotamento
            arrival_ideal_date = exhaustion_date - timedelta(days=15)
            # Data ótima para o pedido: data ideal de chegada menos o lead time fixo de 7 dias
            optimal_order_date = arrival_ideal_date - timedelta(days=7)

            # Validade do lote atual: número de dias entre o início do ciclo e a data de expiração
            validity_days = (lot_expiration - cycle_start_date).days
            if validity_days < 0:
                validity_days = 0

            # Quantidade do pedido: o máximo que se pode consumir antes do vencimento
            order_quantity = avg_consumption_rate * validity_days

            # Média de consumo do último mês (informação adicional)
            last_month_avg = monthly_avg_consumption(df_med)

            # Total consumido até o momento (para cálculo da porcentagem em relação à ata)
            total_consumed = total_consumed_so_far(df_med)

            # Verifica se existe uma ata de registro de preço para esse medicamento
            df_ata_med = df_atas[df_atas['id_medicamento'] == med_id]
            if not df_ata_med.empty:
                ata = df_ata_med.iloc[0]
                valor_unitario = ata['valor_unitario']
                qtd_max = ata['quantidade_maxima']
                cost_of_lot = order_quantity * valor_unitario
                if qtd_max > 0:
                    percentage_consumed = (total_consumed / qtd_max)
                else:
                    percentage_consumed = 0.0
                procurement_mode = "Ata de Registro de Preço"
            else:
                valor_unitario = np.nan
                cost_of_lot = np.nan
                percentage_consumed = np.nan
                procurement_mode = "Pregão pontual"

            resultados.append({
                'id_medicamente': med_id,
                'tipo': med_tipo,
                'procurement_mode': procurement_mode,
                'optimal_order_date': optimal_order_date.date(),
                'order_quantity': order_quantity,
                'cost_of_lot': cost_of_lot,
                'avg_consumption_rate': avg_consumption_rate,
                'last_month_avg_consumption': last_month_avg,
                'percentage_consumed': percentage_consumed
            })


        df_resultados = pd.DataFrame(resultados)
        id = int(id)
        df_resultados = df_resultados[df_resultados['id_medicamente'] == id]
        return HttpResponseModel(
            message="Prediction",
            status_code=HTTPResponses.MODEL_RETURNED().status_code,
            data={"result": df_resultados.to_dict(orient="records")},
        )

    @staticmethod
    def get_report(name: str) -> HttpResponseModel:
        pass
