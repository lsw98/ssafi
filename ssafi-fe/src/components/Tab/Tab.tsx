import { useState } from 'react';
import styled from 'styled-components';
import './Tab.css';
import searchIcon from '../../assets/icons/search-icon.svg';
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

function Tabs() {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index: number) => {
    setToggleState(index);
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
        <div
          className={toggleState === 1 ? 'content active-content' : 'content'}
        >
          <StocksSearchBarArea>
            <StocksSearchBar>
              <StocksSearchIcon />
              <StocksSearchTextbox />
            </StocksSearchBar>
          </StocksSearchBarArea>
          <StocksAllList>content1</StocksAllList>
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

export default Tabs;
