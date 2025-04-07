import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { theme } from '../../../styles/theme';

interface GraficoLinhaProps {
  dadosX: string[];
  dadosY: number[];
}

export default function GraficoLinha({ dadosX, dadosY }: GraficoLinhaProps) {
  const chartContainerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(800);
  const chartHeight = 300;

  // Agrupa valores iguais de X e soma os Y correspondentes
  const { processedX, processedY } = React.useMemo(() => {
    const sumMap = new Map<string, number>();
    if (Array.isArray(dadosX) && Array.isArray(dadosY) && dadosX.length === dadosY.length) {
      dadosX.forEach((x, i) => {
        const y = Number(dadosY[i]) || 0;
        sumMap.set(x, (sumMap.get(x) ?? 0) + y);
      });
    }
    const sortedEntries = Array.from(sumMap.entries()).sort((a, b) => {
      const parseDate = (dateStr: string) =>
        new Date(dateStr.split('/').reverse().join('-')).getTime();
      return parseDate(a[0]) - parseDate(b[0]);
    });
    return {
      processedX: sortedEntries.map(([key]) => key),
      processedY: sortedEntries.map(([_, value]) => value),
    };
  }, [dadosX, dadosY]);

  const totalPoints = processedY.length;
  
  let seriesData1: (number | null)[];
  let seriesData2: (number | null)[];
  
  if (totalPoints >= 4) {
    seriesData1 = processedY.map((value, index) =>
      index <= totalPoints - 4 ? value : null
    );
    seriesData2 = processedY.map((value, index) =>
      index === totalPoints - 4 ? value : (index >= totalPoints - 3 ? value : null)
    );
  } else {
    seriesData1 = processedY;
    seriesData2 = processedY.map(() => null);
  }

  // Domínio manual do eixo Y para cálculo das linhas de referência
  const yMin = 0;
  const yMax = 12000;
  
  // Função para converter um valor Y em posição (pixels)
  const getYPosition = (value: number) => {
    const scale = chartHeight / (yMax - yMin);
    return chartHeight - (value - yMin) * scale;
  };

  React.useEffect(() => {
    function handleResize() {
      if (chartContainerRef.current) {
        setContainerWidth(chartContainerRef.current.offsetWidth);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={chartContainerRef}
      style={{ position: 'relative', width: '100%', height: chartHeight }}
    >
      <LineChart
        series={[
          {
            data: seriesData1,
            color: theme.colors.laranjaPrincipal,
            connectNulls: true,
          },
          {
            data: seriesData2,
            color: theme.colors.verde,
            connectNulls: true,
          },
        ]}
        xAxis={[{ scaleType: 'point', data: processedX }]}
        yAxis={[{ min: yMin, max: yMax}]}
        width={containerWidth}
        height={chartHeight}
        sx={{
          fontFamily: theme.fonts.abeezee,
          '& .MuiChartsAxis-label': { fontSize: 14, fontWeight: 'bold' },
        }}
      />
      <svg
        width={containerWidth*0.88}
        height={chartHeight}
        style={{ position: 'absolute', top: 0, left: 50, pointerEvents: 'none' }}
      >
        <line
          x1={0}
          x2={containerWidth}
          y1={getYPosition(4000)}
          y2={getYPosition(4000)}
          stroke="red"
          strokeDasharray="4 4"
        />
        <line
          x1={0}
          x2={containerWidth}
          y1={getYPosition(8000)}
          y2={getYPosition(8000)}
          stroke="green"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}
