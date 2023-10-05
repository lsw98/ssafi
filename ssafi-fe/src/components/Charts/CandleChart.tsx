import React from 'react';
import ApexCharts from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

type CandleData = {
  x: string; // 시간이나 날짜
  y: [number, number, number, number]; // [시가, 최고가, 최저가, 종가] 순서
};

type CandleChartProps = {
  data: CandleData[];
};

const CandleChart: React.FC<CandleChartProps> = ({ data }) => {
  const options: ApexOptions = {
    chart: {
      height: 500,
      width: 500,
      toolbar: {
        tools: {},
      },
      background: 'transparent',
    },
    grid: {
      show: false,
    },
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: true,
        },
      },
    },
    xaxis: {
      type: 'datetime',
      // categories: data.map((price) => price.x), // 시간 정보가 이미 포함되어 있으므로 이렇게 사용
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  };

  const series = [
    {
      data: data.map((price) => ({
        x: price.x,
        y: price.y,
      })),
    },
  ];

  return (
    <ApexCharts options={options} series={series} width={800} height={400} />
  );
};

export default CandleChart;
