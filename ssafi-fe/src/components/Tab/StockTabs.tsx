import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './StockTabs.css';
import searchIcon from '../../assets/icons/search-icon.svg';
import { fetchStockCodes } from '../../utility/api';
import { fetchStockPrice } from '../../utility/api';

// 뉴스 검색바 영역 (이후 확장성을 위해 만들어둠)
const StocksSearchBarArea = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

// 뉴스 검색바 속성
const StocksSearchBar = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 80%;
  height: 30%;
  border: 3px solid var(--dark-color);
  border-radius: 20px;
  background-color: var(--white-color);
`;

// 돋보기 모양 아이콘
const StocksSearchIcon = styled.img.attrs({
  src: `${searchIcon}`,
})`
  width: 10%;
`;

// 검색바 텍스트 입력 영역 속성
const StocksSearchTextbox = styled.input.attrs({
  placeholder: '원하는 종목을 입력하세요.',
})`
  width: 80%;
  height: 60%;
  margin-left: 1%;
  font-size: 15%;
  color: var(--dark-color);
  background-color: var(--white-color);
  border: 0px;
  outline: none;
`;
const StocksAllList = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

const StocksInterests = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

function StockTabs() {
  const [toggleState, setToggleState] = useState(1);
  const [stockData, setStockData] = useState<any[]>([]); // 종목 정보를 저장할 상태
  const toggleTab = (index: number) => {
    setToggleState(index);
  };

  // 메인 로직을 비동기 함수로 작성
  const fetchAllStockData = async () => {
    const stockCodes = await fetchStockCodes();
    const allStockData = [];

    for (const code of stockCodes) {
      const stockData = await fetchStockPrice(code);
      console.log(code, stockData);
      allStockData.push({ code, ...stockData }); // 예시, 실제 데이터 구조에 맞게 수정
    }

    setStockData(allStockData);
  };

  // 컴포넌트가 마운트될 때 실행
  // useEffect(() => {
  //   fetchAllStockData().catch((error) => console.error(error));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const stockCodes = await fetchStockCodes();
      console.log(stockCodes);
    }

    fetchData().catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <div className="bloc-tabs">
        <div
          className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          전체
        </div>
        <div
          className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          관심
        </div>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? 'content active-content' : 'content'}
        >
          <StocksSearchBarArea>
            <StocksSearchBar>
              <StocksSearchIcon />
              <StocksSearchTextbox />
            </StocksSearchBar>
          </StocksSearchBarArea>
          <StocksAllList>
            {/* 종목 데이터를 맵핑하여 표시 */}
            {stockData.map((stock, index) => (
              <div key={index}>
                <span>{stock}</span> {/* 종목 코드 */}
                <span>{stock}</span>{' '}
                {/* 현재가, 실제 데이터 구조에 맞게 수정 */}
              </div>
            ))}
          </StocksAllList>
        </div>
        <div
          className={toggleState === 2 ? 'content active-content' : 'content'}
        >
          <div>
            <StocksSearchBarArea>
              <StocksSearchBar>
                <StocksSearchIcon />
                <StocksSearchTextbox />
              </StocksSearchBar>
            </StocksSearchBarArea>
            <StocksInterests>content2</StocksInterests>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockTabs;
