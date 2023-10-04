import React from 'react';
import styled from 'styled-components';

interface Stock {
  code: string;
  name: string;
}

interface StockEachProps {
  index: number;
  stock: Stock;
}

const Container = styled.div`
  width: 100%;
`;

export default StockEach = ({ index, stock }: StockEachProps) => {
  // 에러 방지

  return (
    <Container>
      <svg
        className={`star ${clickedStar[index] ? 'filled' : ''}`}
        onClick={() => toggleStar(stock, index)}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="19"
        viewBox="0 0 20 19"
        fill="none"
      >
        <path
          d="M10 2.60396L11.7217 6.74345L11.9563 7.30742L12.5651 7.35623L17.0341 7.7145L13.6292 10.6311L13.1653 11.0285L13.307 11.6226L14.3473 15.9835L10.5213 13.6466L10 13.3282L9.47875 13.6466L5.65272 15.9835L6.69296 11.6226L6.83468 11.0285L6.3708 10.6311L2.96595 7.7145L7.43488 7.35623L8.04372 7.30742L8.27829 6.74345L10 2.60396Z"
          stroke="#EFDA4C"
          stroke-width="2"
        />
      </svg>
      <div style={{ marginRight: '10px' }}>
        <span>{stock.name}</span> {/* 종목명 */}
      </div>
      <div>
        <Tooltip
          color={
            Number(stock.prdy_vrss_sign) === 5
              ? 'var(--lower-color)'
              : Number(stock.prdy_vrss_sign) === 2
              ? 'var(--upper-color)'
              : 'black'
          }
        >
          {Number.isNaN(Number(stock.stck_prpr))
            ? 'Loading...'
            : Number(stock.stck_prpr).toLocaleString()}
        </Tooltip>
      </div>
    </Container>
  );
};
