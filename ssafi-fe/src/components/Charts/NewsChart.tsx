/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-else-return */
/* eslint-disable object-shorthand */
import React from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { registerables, Chart as ChartJS, CategoryScale } from 'chart.js';

import stockUpArrow from '../../assets/images/stock-up.svg';
import stockDownArrow from '../../assets/images/stock-down.svg';

ChartJS.register(CategoryScale, ...registerables);
ChartJS.defaults.font.size = 10;

// news.tsx에서 prop 받은 정보
interface GraphProps {
  title: string;
  status: string;
}

// 그래프가 상승인지 하락인지 전달하는 prop
interface GraphStatusProps {
  status: string
}

export default function NewsChart({ title, status }: GraphProps) {
  const labelData: number[] = [];
  for (let i = 0; i < 40; i += 1) {
    labelData.push(i);
  }
  const stockData = [1268, 1277, 1269, 1271, 1270, 1264, 1275, 1266, 1270, 1264, 1275, 1266, 1268, 1277, 1269, 1271, 1270, 1264, 1275, 1266, 1270, 1264, 1275, 1266, 1268, 1277, 1269, 1271, 1270, 1264, 1275, 1266, 1270, 1264, 1275, 1266, 1268, 1277, 1269, 1271, 1270, 1264, 1275, 1266, 1270, 1264, 1275, 1266];
  const stockAverage = stockData.reduce((sum, value) => sum + value, 0) / stockData.length;
  const [graphColors, setGraphColors] = React.useState<string[]>(['#DDF1FF', '#434FD9']);
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
  if (status === 'up') {
    setGraphColors(['#FFDEDE', '#FF6464']);
  } else {
    setGraphColors(['#DDF1FF', '#434FD9']);
  }
  }, []);

  // eslint-disable-next-line consistent-return
  const filterTicks = (counts: number, index: number) => {
    if (counts <= 14) {
      return labelData[index];
    } else if (counts >= 15 && counts <= 28) {
      return index % 2 === 0 ? labelData[index] : '' as const;
    } else if (counts >= 29 && counts <= 42) {
      return index % 3 === 0 ? labelData[index] : '' as const;
    } else if (counts >= 43 && counts <= 56) {
      return index % 4 === 0 ? labelData[index] : '' as const;
    } else if (counts >= 57 && counts <= 70) {
      return index % 5 === 0 ? labelData[index] : '' as const;
    } else if (counts >= 71) {
      return index % 6 === 0 ? labelData[index] : '' as const;
    }
  };

  const chartData = {
    labels: labelData,
    datasets: [
      {
        label: 'dataset1',
        data: stockData,
        borderColor: graphColors[0],
        hoverBackgroundColor: graphColors[1],
        hoverBorderColor: graphColors[1],
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
            return filterTicks(labelData.length, index);
          },
        },
      },
    },
  };

  return (
    <GraphBox>
      <GraphText>
        <GraphTitle>{title}</GraphTitle>
        <GraphInfos>
          <StockPrice status={status}>{stockData[stockData.length - 1].toLocaleString()}</StockPrice>
          <GraphArrow src={status === 'up' ? stockUpArrow : stockDownArrow} />
          <PriceChange status={status}>2.57</PriceChange>
          <PriceChange status={status}>-0.10%</PriceChange>
        </GraphInfos>
      </GraphText>
      <Line data={chartData} options={chartOptions} width="300px" />
    </GraphBox>
  );
}

const GraphBox = styled.div`
width: 320px;
padding: 10px;
background-color: var(--white-color);
border-radius: 10px;
box-shadow: 5px 5px 10px var(--light-gray-color);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-bottom: 30px;
`;

const GraphText = styled.div`
display: flex;
flex-direction: column;
align-items: start;
justify-content: center;

width: 300px;
margin-bottom: 20px;
`;

const GraphTitle = styled.p`
margin-top: 20px;
margin-bottom: 20px;
font-size: 26px;
font-weight: 600;
color: var(--black-color);
`;

const GraphInfos = styled.div`
display: flex;
justify-content: start;
align-items: end;

width: 300px;
color: var(--lower-color);
`;

const StockPrice = styled.p<GraphStatusProps>`
margin: 0px 30px 0px 0px;
font-size: 26px;
font-weight: 600;

color: ${(props) => (props.status === 'up' ? 'var(--upper-color)' : 'var(--lower-color)')};
`;

const PriceChange = styled.p<GraphStatusProps>`
margin: 0px 30px 0px 0px;
font-size: 18px;
font-weight: 500;

color: ${(props) => (props.status === 'up' ? 'var(--upper-color)' : 'var(--lower-color)')};
`;

const GraphArrow = styled.img`
width: 16px;
margin: 0px 5px 3px 0px;
`;
