import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { theme } from '../../../styles/theme';

interface GraficoBarraProps {
  totalEstoque: number;
  id: number;
}

export default function GraficoBarra({ totalEstoque, id }: GraficoBarraProps) {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(600); // Largura inicial

  React.useEffect(() => {
    function handleResize() {
      if (chartRef.current) {
        setWidth(chartRef.current.offsetWidth);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setores = ['Almoxarifado', 'Cardiologia', 'Oncologia', 'Pediatria', 'UTI'];
  let pesos: number[];
  
  switch (id) {
    case 1:
      pesos = [4, 2, 2.5, 0.5, 1];
      break;
    case 2:
      pesos = [3.5, 2, 2.2, 1, 1.3];
      break;
    case 3:
      pesos = [3, 4, 1.25, 0.5, 1.25];
      break;
    case 4:
      pesos = [5, 1.25, 2, 0.75, 1];
      break;
    default:
      pesos = [1, 1, 1, 1, 1];
  }
  
  const somaPesos = pesos.reduce((acc, cur) => acc + cur, 0);
  
  // Calcula a distribuição base proporcionalmente, arredondando para baixo
  const distribuicaoBase: number[] = pesos.map(w => Math.floor(totalEstoque * (w / somaPesos)));
  
  // Calcula o total distribuído e o restante a ser alocado
  const somaDistribuida = distribuicaoBase.reduce((acc, cur) => acc + cur, 0);
  const resto = totalEstoque - somaDistribuida;
  
  // Adiciona o restante ao primeiro setor (você pode ajustar essa lógica se desejar distribuir de outra forma)
  const distribuicao = [...distribuicaoBase];
  distribuicao[0] += resto;
  

  return (
    <div ref={chartRef} style={{ width: '100%', height: 300 }}>
      <BarChart
        xAxis={[{ 
          scaleType: 'band', 
          data: setores,
        }]}
        series={[{ 
          data: distribuicao,
          color: theme.colors.verde,
        }]}
        width={width}
        height={300}
      />
    </div>
  );
}
