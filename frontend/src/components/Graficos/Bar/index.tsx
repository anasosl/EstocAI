import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { theme } from '../../../styles/theme';

export default function GraficoBarra() {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Almoxarifado', 'Pronto Socorro', 'Farmácia', 'Centro Cirúrgico', 'Enfermarias', 'UTI', 'Psiquiatria'] }]}
      series={[{ data: [2500, 3200, 4000, 4500, 5000, 6500, 3500],
        color: theme.colors.verde
      }]}
      width={800}
      height={300}
    />
  );
}
