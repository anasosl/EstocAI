import * as React from 'react';
import { LineChart } from '@mui/x-charts';
import { theme } from '../../../styles/theme';

export default function GraficoLinha() {
  return (
    <LineChart
      xAxis={[{ scaleType: 'point', data: ["Maio", "Junho", "Julho", "Agosto"] }]}
      series={[{
        data: [5000, 10500, 16000, 26000],
        color: theme.colors.laranjaPrincipal
      }]}
      width={800}
      height={300}
      sx={{
        fontFamily: theme.fonts.abeezee,
        '& .MuiChartsAxis-label': { fontSize: 14, fontWeight: 'bold' },
      }}
    />
  );
}
