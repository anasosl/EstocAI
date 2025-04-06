import * as React from 'react';
import { LineChart } from '@mui/x-charts';
import { theme } from '../../../styles/theme';

export default function GraficoLinha({dadosX, dadosY}: any) {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(800);

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
      <LineChart
        xAxis={[{ scaleType: 'point', data: dadosX }]}
        series={[{
          data: dadosY,
          color: theme.colors.laranjaPrincipal
        }]}
        width={width}
        height={300}
        sx={{
          fontFamily: theme.fonts.abeezee,
          '& .MuiChartsAxis-label': { fontSize: 14, fontWeight: 'bold' },
        }}
      />
    </div>
  );
}
