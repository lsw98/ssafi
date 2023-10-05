import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StockTabs from '../Tab/StockTabs';
import TradingTabs from '../Tab/TradingTabs';
import AccountTabs from '../Tab/AccountTabs';
import {
  fetchTradeVolumeRanking,
  fetchStockInfo,
  fetchMinutePrices,
} from '../../utility/api';
import CandleChart from '../Charts/CandleChart';

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

interface StockInfoType {
  hts_kor_isnm: string;
  stck_prpr: string;
  prdy_vrss: string;
  prdy_vrss_sign: string;
  prdy_ctrt: string;
  stck_prdy_clpr: string;
  stck_hgpr: string;
  stck_mxpr: string;
  acml_vol: string;
  stck_oprc: string;
  stck_lwpr: string;
  stck_llam: string;
  acml_tr_pbmn: string;
}

export type CandleData = {
  x: string; // 시간이나 날짜
  y: [number, number, number, number]; // [시가, 최고가, 최저가, 종가] 순서
};

export default function TradeOrder() {
  const [stockCode, setStockCode] = useState<string>('005930');
  const [stockInfo, setStockInfo] = useState<StockInfoType | null>(null);
  const [minutePricesData, setMinutePricesData] = useState<any[]>([]);
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(null);
  const handleStockClick = (selectedStockCode: string) => {
    setStockCode(selectedStockCode);
  };
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    const loadStockInfo = async () => {
      // console.log(stockCode);
      if (stockCode) {
        const data = await fetchStockInfo(stockCode);
        setStockInfo(data);
      }
    };
    loadStockInfo();
    // console.log(stockInfo);
  }, [stockCode]);

  useEffect(() => {
    const fetchMinutePricesData = async () => {
      if (stockCode) {
        const result = await fetchMinutePrices(stockCode);
        setMinutePricesData(result);
        console.log('분봉조회', result);
      }
    };
    fetchMinutePricesData();
  }, [stockCode]);

  const toISODateTimeWithOffset = (dateStr: string, timeStr: string) => {
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);

    const hour = timeStr.substring(0, 2);
    const minute = timeStr.substring(2, 4);
    const second = timeStr.substring(4, 6);

    const date = new Date(
      Date.UTC(
        parseInt(year, 10),
        parseInt(month, 10) - 1, // month is 0-indexed
        parseInt(day, 10),
        parseInt(hour, 10) - 9,
        parseInt(minute, 10),
        parseInt(second, 10),
      ),
    );

    return date.toISOString();
  };

  const transformedData: CandleData[] = minutePricesData
    .map((item) => ({
      x: toISODateTimeWithOffset(item.stck_bsop_date, item.stck_cntg_hour),
      y: [
        parseInt(item.stck_oprc),
        parseInt(item.stck_hgpr),
        parseInt(item.stck_lwpr),
        parseInt(item.stck_prpr),
      ] as [number, number, number, number],
    }))
    .reverse();

  useEffect(() => {
    const fetchData = async () => {
      await fetchTradeVolumeRanking((fetchedTime: any) => {
        if (fetchedTime) {
          const formattedTime = fetchedTime.formatted;
          setCurrentTime(formattedTime);
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
        <StockTabs onStockClick={handleStockClick} />{' '}
      </LeftColumn>
      <CenterColumn>
        <GraphContainer>
          <StockInfo>
            {stockInfo ? (
              <>
                <div>
                  {stockInfo.hts_kor_isnm} {stockCode}
                </div>
                <div>
                  {stockInfo.stck_prpr}
                  <br />
                  전일대비: {stockInfo.prdy_vrss} {stockInfo.prdy_vrss_sign}{' '}
                  {stockInfo.prdy_ctrt}%
                </div>
                <div>
                  전일: {stockInfo.stck_prdy_clpr} / 고가(상한가):{' '}
                  {stockInfo.stck_hgpr}({stockInfo.stck_mxpr}) / 거래량:{' '}
                  {stockInfo.acml_vol}
                </div>
                <div>
                  시가: {stockInfo.stck_oprc} / 저가(하한가):{' '}
                  {stockInfo.stck_lwpr}({stockInfo.stck_llam}) / 거래대금:{' '}
                  {stockInfo.acml_tr_pbmn}
                </div>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </StockInfo>
          <CandleChart data={transformedData} />
        </GraphContainer>
        <TradingAndAccountContainer>
          <Trading>
            <TradingTabs stockCode={stockCode} />
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
