import React from 'react';
import styled from 'styled-components';
import StockTabs from '../Tab/StockTabs';
import TradingTabs from '../Tab/TradingTabs';
import AccountTabs from '../Tab/AccountTabs';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const LeftColumn = styled.div`
  flex: 20; /* 왼쪽 열을 20%로 설정 */
  background-color: #f0f0f0;
  padding: 20px;
`;

const CenterColumn = styled.div`
  flex: 60; /* 가운데 열을 60%로 설정 */
  display: flex;
  flex-direction: column;
`;

const GraphContainer = styled.div`
  flex: 1;
  padding: 25px 24.523px 0px 25px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
  height: 60%;
`;

const StockInfo = styled.div`
display-flex;
height: 20%;
`;
const CandleChart = styled.div`
display-flex;
height: 80%;`;

const TradingAndAccountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 20px 0 0 0;
  height: 40%;
`;

const Trading = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 10px;
`;

const Account = styled.div`
  flex: 1;
  background-color: #ffffff;
  padding: 10px;
`;

const Price = styled.div``;

const RightColumn = styled.div`
  flex: 20; /* 오른쪽 열을 20%로 설정 */
  background-color: #f0f0f0;
  padding: 20px;
`;
const AmountRanking = styled.div`
  width: 100%;
  height: 60%;
  flex-shrink: 0;
  border-radius: 25px;
  background: var(--White, #fdfdfd);
  box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.08);

  h2 {
    color: var(--Dark, #0d1545);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    &::before {
      content: ''; /* 가상 요소 내용 초기화 */
      position: absolute; /* 가상 요소에 대한 절대 위치 설정 */
      top: 50%; /* 가운데 정렬을 위한 top 위치 설정 */
      left: 0;
      width: 100%; /* 가로 너비 100% 설정 */
      height: 8px; /* 그래프의 높이 설정 */
      background-color: var(
        --Gradation,
        linear-gradient(
          180deg,
          rgba(131, 236, 220, 0.15) 0%,
          rgba(74, 196, 158, 0.32) 100%
        )
      ); /* 그래프 배경색 설정 */
      transform: translateY(-50%); /* 가운데 정렬을 위한 이동 */
      z-index: -1; /* 텍스트 위로 오도록 배치 */
    }
  }
`;

export default function TradeOrder() {
  return (
    <Container>
      <LeftColumn>
        {/* 왼쪽 열 컨텐츠 (Stocks) */}
        <StockTabs />
      </LeftColumn>
      <CenterColumn>
        {/* 가운데 열 컨텐츠 (Graph, Trading, Account) */}
        <GraphContainer>
          <StockInfo>주식정보</StockInfo>
          <CandleChart>캔들차트</CandleChart>
        </GraphContainer>
        <TradingAndAccountContainer>
          <Trading>
            <TradingTabs />
          </Trading>

          <Account>
            <AccountTabs />
          </Account>
        </TradingAndAccountContainer>
      </CenterColumn>
      <RightColumn>
        <AmountRanking>
          <h2>거래량 TOP 10</h2>
        </AmountRanking>
      </RightColumn>
    </Container>
  );
}
