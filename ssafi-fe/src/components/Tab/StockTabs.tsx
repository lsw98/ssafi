import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './StockTabs.css';
import searchIcon from '../../assets/icons/search-icon.svg';
import { fetchStockInfo } from '../../utility/api';
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
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const StocksInterests = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

const Tooltip = styled.div<{ color: string }>`
  width: 30%;
  top: 5%;
  // right: 12px;
  // background: var(--Sub, #e7faf7);
  color: var(--black-color);
  // font-size: 5%;
  color: ${(props) => props.color};
`;

function StockTabs() {
  const [toggleState, setToggleState] = useState(1);
  const [stockInfo, setStockInfo] = useState<any[]>([]);
  const [stockData, setStockData] = useState<any[]>([]); // 종목 정보를 저장할 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 관리하는 상태 변수
  const [interests, setInterests] = useState<any[]>([]); // 관심 종목을 담을 상태
  const [clickedStar, setClickedStar] = useState<Record<string, boolean>>({}); // 별이 클릭되었는지 담을 상태
  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  const handlePageChange = async (newPage: number) => {
    setCurrentPage(newPage); // 현재 페이지 상태 업데이트
    await loadPageData(newPage); // 페이지에 맞는 데이터 로딩
  };
  // 모든 주식 코드를 미리 가져온다
  useEffect(() => {
    fetchStockInfo().then((info) => setStockInfo(info));
  }, []);

  const itemsPerPage = 20;

  const loadPageData = async (page: number) => {
    setIsLoading(true); // 데이터를 불러오기 시작할 때 로딩 상태를 true로 설정

    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;

    const slice = stockInfo.slice(start, end);
    const allStockData = [];

    for (const { stockCode, stockName } of slice) {
      const stockData = await fetchStockPrice(stockCode);
      allStockData.push({ code: stockCode, name: stockName, ...stockData });
    }
    console.log('Loaded 20 stock data:', allStockData);
    setStockData(allStockData);
    setIsLoading(false); // 데이터를 모두 불러왔을 때 로딩 상태를 false로 설정
  };

  useEffect(() => {
    if (stockInfo.length > 0) {
      loadPageData(1);
    }
  }, [stockInfo]);

  const toggleStar = (stock: string, index: number) => {
    const isClicked = clickedStar[index] || false;

    setClickedStar({
      ...clickedStar,
      [index]: !isClicked,
    });

    if (!isClicked) {
      // 관심 종목에 추가
      setInterests([...interests, stock]);
    } else {
      // 관심 종목에서 제거
      const newInterests = interests.filter((item) => item !== stock);
      setInterests(newInterests);
    }
  };

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
        {isLoading ? (
          <div>Loading...</div> // 로딩 중일 때 표시할 컴포넌트
        ) : (
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
                <li key={index}>
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
                  <div>
                    <span>{stock.name}</span> {/* 종목명 */}
                  </div>
                  <div>
                    <Tooltip
                      color={
                        Number(stock.prdy_vrss_sign) === 5
                          ? 'blue'
                          : Number(stock.prdy_vrss_sign) === 2
                          ? 'red'
                          : 'black'
                      }
                    >
                      {Number(stock.stck_prpr).toLocaleString()}
                    </Tooltip>
                  </div>
                </li>
              ))}
            </StocksAllList>
            <div className="button-container">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                이전
              </button>
              {/* 버튼이 항상 5개만 보이도록 처리 */}
              {(() => {
                let startPage = currentPage - 2;
                let endPage = currentPage + 2;

                // 페이지가 1, 2인 경우
                if (currentPage < 3) {
                  startPage = 1;
                  endPage = 5;
                }

                // 페이지가 마지막 두 페이지인 경우
                // 예: 9, 10 페이지인 경우 (총 페이지가 10개일 때)
                if (currentPage > 8) {
                  startPage = 6;
                  endPage = 10;
                }

                return Array.from(
                  { length: endPage - startPage + 1 },
                  (_, index) => startPage + index,
                ).map((pageNum) => (
                  <button
                    key={pageNum}
                    disabled={currentPage === pageNum}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ));
              })()}
              <button onClick={() => handlePageChange(currentPage + 1)}>
                다음
              </button>
            </div>
          </div>
        )}
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
            <StocksInterests>
              {/* 관심 종목 표시 */}
              {interests.map((stock) => (
                <div key={stock}>
                  <div>
                    <span>{stock.name}</span> {/* 종목명 */}
                  </div>
                  <div>
                    <Tooltip
                      color={
                        Number(stock.prdy_vrss_sign) === 5
                          ? 'blue'
                          : Number(stock.prdy_vrss_sign) === 2
                          ? 'red'
                          : 'black'
                      }
                    >
                      {Number(stock.stck_prpr).toLocaleString()}
                    </Tooltip>
                  </div>
                </div>
              ))}
            </StocksInterests>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockTabs;
