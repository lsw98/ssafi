/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-else-return */
/* eslint-disable object-shorthand */
import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
);

const options = {
  maxBarThickness: 50,
  maintainAspectRatio: true,
  grouped: false,
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  // plugins: {
  //   title: {
  //     display: true,
  //     text: 'Chart.js Line Chart - Multi Axis',
  //   },
  // },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: '위험형',
      borderColor: '#FD5353',
      borderWidth: 2,
      fill: false,
      data: [4820, 602, 2550, 1500, 2600, 3200, 4500],
      yAxisID: 'y',
    },
    {
      type: 'line' as const,
      label: '중립형',
      borderColor: '#EFDA4C',
      borderWidth: 2,
      fill: false,
      data: [520, 3200, 5200, 4820, 5220, 3200, 520],
      yAxisID: 'y',
    },
    {
      type: 'line' as const,
      label: '안정형',
      borderColor: '#3AB67A',
      borderWidth: 2,
      fill: false,
      data: [870, 2500, 1000, 1102, 200, 1000, 810],
      yAxisID: 'y',
    },
    {
      type: 'bar' as const,
      label: 'Dataset 2',
      data: [0, 699, 0, 0, 108, 0, 60],
      backgroundColor: '#FF6464',
      borderWidth: 0,
      yAxisID: 'y1',
    },
    {
      type: 'bar' as const,
      label: 'Dataset 2',
      data: [-423, 0, -193, -847, 0, -20, 0],
      backgroundColor: '#434FD9',
      borderWidth: 0,
      yAxisID: 'y1',
    },
  ],
};

function triggerTooltip(chart: ChartJS | null) {
  const tooltip = chart?.tooltip;

  if (!tooltip) {
    return;
  }

  if (tooltip.getActiveElements().length > 0) {
    tooltip.setActiveElements([], { x: 0, y: 0 });
  } else {
    const { chartArea } = chart;

    tooltip.setActiveElements(
      [
        {
          datasetIndex: 0,
          index: 2,
        },
        {
          datasetIndex: 3,
          index: 2,
        },
      ],
      {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top + chartArea.bottom) / 2,
      },
    );
  }

  chart.update();
}

export default function TradeChart() {
  const chartRef = useRef<ChartJS>(null);

  useEffect(() => {
    const chart = chartRef.current;

    triggerTooltip(chart);
  }, []);

  return (
    <Container>
      <Chart ref={chartRef} type='bar' data={data} options={options}/>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
`;
