import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { theme } from '../../../styles/theme';

interface GraficoBarraProps {
  totalEstoque: number;
}

export default function GraficoBarra({ totalEstoque }: GraficoBarraProps) {
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
  const valorPorSetor = Math.floor(totalEstoque / setores.length);
  const resto = totalEstoque % setores.length;
  const distribuicao = Array(setores.length).fill(valorPorSetor);
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
