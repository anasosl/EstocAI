from src.schemas.response import HTTPResponses, HttpResponseModel
from src.service.meta.item_service_meta import ItemServiceMeta
from src.db.__init__ import database as db
import os
import pandas as pd
import numpy as np
from datetime import timedelta, datetime
from sklearn.linear_model import LinearRegression

class ModelService(ItemServiceMeta):

    @staticmethod
    # TODO: Prevision
    def get_prediction(id: str) -> HttpResponseModel:
        df = pd.read_csv("src/data/input_ia.csv")

        df['timestamp'] = pd.to_datetime(df['timestamp'])
        df['expiration_date'] = pd.to_datetime(df['expiration_date'])
        hoje = pd.Timestamp(datetime.today().date())
        resultados = []

        for med_id in df['id_medicamento'].unique():
            df_med = df[df['id_medicamento'] == med_id].sort_values('timestamp').reset_index(drop=True)
            if df_med.empty or len(df_med) < 2:
                continue

            # Identifica os pontos onde há reabastecimento (received_amount > 0)
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
                # Número de dias decorridos a partir do início do ciclo
                ciclo['dias'] = (ciclo['timestamp'] - cycle_start).dt.days
                if len(ciclo) < 2:
                    continue
                X = ciclo[['dias']]
                y = ciclo['quantidade']
                modelo = LinearRegression()
                modelo.fit(X, y)
                slope = modelo.coef_[0]
                # Se o estoque estiver caindo (slope negativo), a taxa de consumo é o valor absoluto do slope
                if slope < 0:
                    taxas.append(abs(slope))
            if len(taxas) == 0:
                continue
            avg_consumption_rate = np.mean(taxas)

            # Usar o ciclo mais recente para as datas (previsão de esgotamento, datas de pedido)
            ciclo_recente = cycles[-1].copy()
            cycle_start_date = ciclo_recente.iloc[0]['timestamp']

            # Obter o estoque atual do ciclo: último registro do ciclo
            current_stock = ciclo_recente.iloc[-1]['quantidade']
            # Estimar quantos dias até esgotar com a taxa média
            t_exhaust = current_stock / avg_consumption_rate
            # Data de esgotamento prevista: última data do ciclo + t_exhaust dias
            exhaustion_date = ciclo_recente.iloc[-1]['timestamp'] + timedelta(days=t_exhaust)

            # Data ideal para chegada do novo lote: 15 dias antes do esgotamento
            arrival_ideal_date = exhaustion_date - timedelta(days=15)
            # Data ótima para o pedido: data ideal de chegada menos o lead time fixo de 7 dias
            optimal_order_date = arrival_ideal_date - timedelta(days=7)

            # Cálculo do período de validade:
            # Segundo a sua regra, a validade é o período entre o início do último lote e a data de expiração desse lote.
            lot_expiration = ciclo_recente.iloc[0]['expiration_date']
            validity_days = (lot_expiration - cycle_start_date).days
            if validity_days < 0:
                validity_days = 0

            # A quantidade a ser pedida é o máximo que pode ser consumido antes da validade,
            # ou seja, a taxa média de consumo multiplicada pelo número de dias de validade.
            order_quantity = avg_consumption_rate * validity_days

            resultados.append({
                'id_medicamente': med_id,
                'optimal_order_date': optimal_order_date.date(),
                'order_quantity': order_quantity,
                'avg_consumption_rate': avg_consumption_rate,
                'validity_days': validity_days
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
    # TODO: Get report
    def get_report(name: str) -> HttpResponseModel:
        pass
