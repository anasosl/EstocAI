import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { theme } from '../../../styles/theme';

export default function GraficoBarra() {
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

  return (
    <div ref={chartRef} style={{ width: '100%', height: 300 }}>
      <BarChart
        xAxis={[{ 
          scaleType: 'band', 
          data: ['Almoxarifado', 'Pronto Socorro', 'Farmácia', 'Centro Cirúrgico', 'Enfermarias', 'UTI', 'Psiquiatria'] 
        }]}
        series={[{ 
          data: [2500, 3200, 4000, 4500, 5000, 6500, 3500],
          color: theme.colors.verde
        }]}
        width={width}
        height={300}
      />
    </div>
  );
}
