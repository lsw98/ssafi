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
        {/* 오른쪽 열 컨텐츠 (Ranking) */}
        거래량 TOP 10
      </RightColumn>
    </Container>
  );
}
