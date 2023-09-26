import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StockTabs from '../Tab/StockTabs';
import TradingTabs from '../Tab/TradingTabs';
import AccountTabs from '../Tab/AccountTabs';
import { fetchTradeVolumeRanking } from '../../utility/api';

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
  flex: 2;
  background-color: #ffffff;
  padding: 10px;
`;

const Account = styled.div`
  flex: 3;
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
  }
`;

const Tooltip = styled.div<{ show: boolean; color: string }>`
  width: 200px;
  top: 30px;
  right: 12px;
  background: var(--Sub, #e7faf7);
  color: var(--black-color);
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 6px;
  display: ${(props) => (props.show ? 'block' : 'none')};
  color: ${(props) => props.color};

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    right: 0px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent var(--light-gray-color) transparent transparent;
  }
`;

export default function TradeOrder() {
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTradeVolumeRanking((fetchedTime: any) => {
        if (fetchedTime) {
          // const formattedTime = formatDate(fetchedTime); // formatDate 함수로 형식을 변경합니다.
          setCurrentTime(fetchedTime); // 형식이 변경된 시간을 상태에 저장
        } else {
          console.log('API call failed.');
        }
      }).then((data) => {
        setRankingData(data);
      });
    };

    fetchData();
  }, []);

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
          <h3>{currentTime}</h3>
          <ul>
            {rankingData.slice(0, 10).map((item, index) => (
              <li
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{ position: 'relative' }}
              >
                {index + 1}. {item.hts_kor_isnm}{' '}
                {Number(item.acml_vol).toLocaleString()}
                <Tooltip
                  show={hoveredIndex === index}
                  color={
                    Number(item.prdy_vrss_sign) === 5
                      ? 'blue'
                      : Number(item.prdy_vrss_sign) === 2
                      ? 'red'
                      : 'black'
                  }
                >
                  {Number(item.stck_prpr).toLocaleString()} ({item.prdy_ctrt}%)
                </Tooltip>
              </li>
            ))}
          </ul>
        </AmountRanking>
      </RightColumn>
    </Container>
  );
}
