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
import stockUp from '../../assets/images/stock-up.svg';
import stockDown from '../../assets/images/stock-down.svg';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const LeftColumn = styled.div`
  flex: 20; /* 왼쪽 열을 20%로 설정 */
  padding: 20px 10px 20px 0px;
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
display: flex;
height: 20%;
align-items: end;
`;

const InfoLeft = styled.div`
width: 280px;
`;

const NameBox = styled.div`
display: flex;
align-items: end;
`;

const StockName = styled.p`
font-size: 20px;
font-weight: 600;
color: var(--black-color);
margin-bottom: 0px;
`;

const StockCode = styled.p`
font-size: 16px;
font-weight: 300;
color: var(--gray-color);
margin-left: 10px;
margin-bottom: 0px;
`;

const StockPrice = styled.p<{updown: string}>`
font-size: 26px;
font-weight: 600;
color: ${(props) => (props.updown.slice(0, 1) === '-') ? 'var(--lower-color)' : 'var(--upper-color)'};
margin-top: 10px;
margin-bottom: 0px;
`;

const CompareInfo = styled.div`
display: flex;
align-items: center;
font-size: 14px;
font-weight: 300;
gap: 10px
`;

const UpdownBox = styled.div`
display: flex;
align-items: center;
`;

const UpdownIcon = styled.img`
width: 10px;
margin-top: 6px;
margin-right: 2px;
`;

const TextSimple = styled.p`
color: var(--black-color);
margin-top: 6px;
margin-bottom: 0px;
`;

const PriceCompare = styled.p<{updown: string}>`
color: ${(props) => (props.updown.slice(0, 1) === '-') ? 'var(--lower-color)' : 'var(--upper-color)'};
margin-bottom: 0px;
margin-top: 6px;
`;

const InfoRight = styled.div`
display: flex;
width: 460px;
font-size: 12px;
font-weight: 300;
justify-content: space-between;
`;

const PriceInfos = styled.div`
display: flex;
justify-content: space-between;
align-items: end;
`;

const PriceInfoLeft = styled.div`
width: 70px;
`;

const PriceInfoMid = styled.div`
width: 160px;
`;

const PriceInfoRight = styled.div`
width: 140px;
`;

const TextSimpleGray = styled.p`
color: var(--gray-color);
margin-bottom: 0px;
`;

const NumDown = styled.p`
color: var(--lower-color);
margin-bottom: 0px;
`;

const NumUp = styled.p`
color: var(--upper-color);
margin-bottom: 0px;
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
  padding: 20px 0px 20px 10px;
`;
const AmountRanking = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 60%;
  flex-shrink: 0;
  border-radius: 25px;
  background: var(--White, #fdfdfd);
  box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.08);
  padding: 5px;

  h2 {
    color: var(--Dark, #0d1545);
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
  }
`;

const RankedTime = styled.div`
display: flex;
justify-content: end;
width: 100%;
color: var(--gray-color);
font-size: 10px;
font-weight: 300;
margin-right: 20px;
margin-bottom: 10px;
`;

const RankedStockList = styled.div`
font-size: 12px;
font-weight: 300px;
`;

const RankedStock = styled.div`
width: 180px;
margin-bottom: 5px;
`;

const RankedStockInfo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const RankedStockText = styled.span`
color: var(--black-color);
`;

const RankedStockNum = styled.span`
color: var(--gray-color);
`;

const Tooltip = styled.div<{ show: boolean; color: string }>`
  width: 160px;
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
                <InfoLeft>
                  <NameBox>
                    <StockName>{stockInfo.hts_kor_isnm}</StockName>
                    <StockCode>{stockCode}</StockCode>
                  </NameBox>
                  <StockPrice updown={stockInfo.prdy_ctrt}>{stockInfo.stck_prpr}</StockPrice>
                  <CompareInfo>
                  <TextSimple>전일대비</TextSimple>
                  <UpdownBox>
                    {stockInfo.prdy_ctrt.slice(0, 1) === '-'
                      ? <UpdownIcon src={stockDown} />
                      : <UpdownIcon src={stockUp} />
                    }
                    <PriceCompare updown={stockInfo.prdy_ctrt}>{stockInfo.prdy_vrss.slice(1, 5)} {stockInfo.prdy_vrss_sign}{' '}</PriceCompare>
                  </UpdownBox>
                  <PriceCompare updown={stockInfo.prdy_ctrt}>{stockInfo.prdy_ctrt}%</PriceCompare>
                </CompareInfo>
                </InfoLeft>
                <InfoRight>
                  <PriceInfoLeft>
                    <PriceInfos>
                      <TextSimpleGray>전일</TextSimpleGray>
                      <TextSimple>{stockInfo.stck_prdy_clpr}</TextSimple>
                    </PriceInfos>
                    <PriceInfos>
                      <TextSimpleGray>시가</TextSimpleGray>
                      <TextSimple>{stockInfo.stck_oprc}</TextSimple>
                    </PriceInfos>
                  </PriceInfoLeft>
                  <PriceInfoMid>
                    <PriceInfos>
                      <TextSimpleGray>고가</TextSimpleGray>
                      <NumUp>{stockInfo.stck_hgpr} (상한가 {stockInfo.stck_mxpr})</NumUp>
                    </PriceInfos>
                    <PriceInfos>
                      <TextSimpleGray>저가</TextSimpleGray>
                      <NumDown>{stockInfo.stck_lwpr} (하한가 {stockInfo.stck_llam})</NumDown>
                    </PriceInfos>
                  </PriceInfoMid>
                  <PriceInfoRight>
                    <PriceInfos>
                      <TextSimpleGray>거래량(주)</TextSimpleGray>
                      <TextSimple>{stockInfo.acml_vol}</TextSimple>
                    </PriceInfos>
                    <PriceInfos>
                      <TextSimpleGray>거래대금(백만)</TextSimpleGray>
                      <TextSimple>{Math.round(parseInt(stockInfo.acml_tr_pbmn) / 1000000)}</TextSimple>
                    </PriceInfos>
                  </PriceInfoRight>
                </InfoRight>
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
          <RankedTime>{currentTime}</RankedTime>
          <RankedStockList>
            {rankingData.slice(0, 10).map((item, index) => (
              <RankedStock
                key={index}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{ position: 'relative' }}
              >
                <RankedStockInfo>
                  <RankedStockText>{index + 1}. {item.hts_kor_isnm}</RankedStockText>
                  <RankedStockNum>{Number(item.acml_vol).toLocaleString()}</RankedStockNum>
                </RankedStockInfo>
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
              </RankedStock>
            ))}
          </RankedStockList>
        </AmountRanking>
      </RightColumn>
    </Container>
  );
}
