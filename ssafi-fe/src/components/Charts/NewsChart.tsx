/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable object-shorthand */
import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { registerables, Chart as ChartJS, CategoryScale } from 'chart.js';

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 10;

const GraphBox = styled.div`
width: 380px;
padding: 10px;
background-color: var(--white-color);
border-radius: 10px;
box-shadow: 5px 5px 10px var(--light-gray-color);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

export default function NewsChart() {
  const labelData: number[] = [];
  for (let i = 0; i < 20; i += 1) {
    labelData.push(i);
  }
  const stockData = [1268, 1277, 1269, 1271, 1270, 1264, 1275, 1266, 1270, 1264, 1275, 1266, 1268, 1277, 1269, 1271, 1270, 1264, 1275, 1266, 1270, 1264, 1275, 1266, 1268, 1277, 1269, 1271, 1270, 1264, 1275, 1266, 1270, 1264, 1275, 1266, 1268, 1277, 1269, 1271, 1270, 1264, 1275, 1266, 1270, 1264, 1275, 1266];
  const stockAverage = stockData.reduce((sum, value) => sum + value, 0) / stockData.length;
  const [yStep, setYStep] = React.useState<number>(0);
  const [yMin, setYMin] = React.useState<number>(0);
  const [yMax, setYMax] = React.useState<number>(0);

  React.useEffect(() => {
    const dataGap = Math.max(...stockData) - Math.min(...stockData);
    if (dataGap < 5) {
      setYStep(1);
      setYMin(Math.round(stockAverage) - 2);
      setYMax(Math.round(stockAverage) + 2);
    } else if (dataGap < 10) {
      setYStep(2);
      setYMin(Math.round(stockAverage / 2) * 2 - 4);
      setYMax(Math.round(stockAverage / 2) * 2 + 4);
    } else if (dataGap < 25) {
      setYStep(5);
      setYMin(Math.round(stockAverage / 5) * 5 - 10);
      setYMax(Math.round(stockAverage / 5) * 5 + 10);
    } else if (dataGap < 50) {
      setYStep(10);
      setYMin(Math.round(stockAverage / 10) * 10 - 20);
      setYMax(Math.round(stockAverage / 10) * 10 + 20);
    } else if (dataGap < 100) {
      setYStep(20);
      setYMin(Math.round(stockAverage / 20) * 20 - 40);
      setYMax(Math.round(stockAverage / 20) * 20 + 40);
    } else if (dataGap < 250) {
      setYStep(50);
      setYMin(Math.round(stockAverage / 50) * 50 - 100);
      setYMax(Math.round(stockAverage / 50) * 50 + 100);
    } else {
      setYStep(100);
      setYMin(Math.round(stockAverage / 100) * 100 - 500);
      setYMax(Math.round(stockAverage / 100) * 100 + 500);
    }
  }, []);

  const chartData = {
    labels: labelData,
    datasets: [
      {
        label: 'dataset1',
        data: stockData,
        borderColor: '#DDF1FF',
        hoverBackgroundColor: '#434FD9',
        hoverBorderColor: '#434FD9',
      },
    ],
  };

  const chartOptions = {
    responsive: false,
    maintainAspectRatio: false,
    pointRadius: 1,
    pointHoverRadius: 1,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    tooltips: {
      mode: 'index' as const,
      intersect: false,
      enabled: true,
      position: 'average', // 라벨 색의 원을 맨 앞에 두기 위해 'average' 사용
      callbacks: {
        title: () => {}, // 제목 비활성화
        label: (context: any) => {
          const xValue = context.parsed.x; // x값 가져오기
          const yValue = context.parsed.y; // y값 가져오기
          return `${xValue} : ${yValue}`; // 'x값: y값' 형식으로 반환
        },
      },
    },
    hover: {
      mode: 'dataset' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: yMin,
        max: yMax,
        ticks: {
          stepSize: yStep,
        },
      },
      x: {
        grid: {
          display: false, // x-축 그리드 비활성화
        },
        ticks: {
          // eslint-disable-next-line max-len, consistent-return
          callback: function (val: string | number | string[] | number[] | null | undefined, index: number) {
            if (labelData.length <= 8) {
              return labelData[index];
            } else if (labelData.length >= 9 && labelData.length <= 18) {
              return index % 2 === 0 ? labelData[index] : '' as const;
            } else if (labelData.length >= 19 && labelData.length <= 30) {
              if (index % 4 === 0) {
                return labelData[index];
              } else {
                return '' as const;
              }
            } else if (labelData.length >= 31 && labelData.length <= 48) {
              if (index % 4 === 0) {
                return labelData[index];
              } else {
                return '' as const;
              }
            } else if (labelData.length >= 49) {
              if (index % 5 === 0) {
                return labelData[index];
              } else {
                return '' as const;
              }
            }
          },
        },
      },
    },
  };

  return (
    <GraphBox>
      <Line data={chartData} options={chartOptions} width="360px" />
    </GraphBox>
  );
}
