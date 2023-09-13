import React from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import styled from 'styled-components';

import NewsHome from './components/NewsLists/NewsHome';
import NewsNewest from './components/NewsLists/NewsNewest';
import NewsPolicies from './components/NewsLists/NewsPolicies';
import NewsMarkets from './components/NewsLists/NewsMarkets';
import NewsAnnounce from './components/NewsLists/NewsAnnounce';
import NewsInfos from './components/NewsLists/NewsInfos';
import searchIcon from './assets/icons/search-icon.svg';

// 뉴스 메뉴 상태 prop type 정의
interface NewsMenuProps {
  active?: boolean;
}

// 뉴스 영역
const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1270px;
  align-items: center;
`;

// 뉴스 nav bar 영역
const NewsNavContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 69px;
  width: 100%;
  border-bottom: 1px solid var(--gray-color);
`;

// 뉴스 nav bar 속성
const NewsNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1270px;
  padding: 0px 30px;
`;

// 뉴스 메뉴 영역
const NewsMenuArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 530px;
`;

// 뉴스 메뉴 속성 (페이지 url에 따른 style 변화)
const NewsMenu = styled.div<NewsMenuProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  cursor: pointer;
  height: ${(props) => (props.active ? '66px' : '69px')};
  color: ${(props) => (props.active ? 'var(--dark-color)' : 'var(--gray-color)')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  border-bottom: ${(props) => (props.active ? '3px solid var(--dark-color)' : '0px')};
  padding-top: ${(props) => (props.active ? '2px' : '0px')};
`;

// 뉴스 검색바 영역 (이후 확장성을 위해 만들어둠)
const NewsSearchBarArea = styled.div``;

// 뉴스 검색바 속성
const NewsSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 40px;
  border: 3px solid var(--dark-color);
  border-radius: 20px;
  background-color: var(--white-color);
`;

// 돋보기 모양 아이콘
const NewsSearchIcon = styled.img.attrs({
  src: `${searchIcon}`,
})`
  width: 30px;
`;

// 검색바 텍스트 입력 영역 속성
const NewsSearchTextbox = styled.input.attrs({
  placeholder: '검색할 단어를 입력하세요.',
})`
  width: 280px;
  height: 34px;
  margin-left: 15px; 
  font-size: 22px;
  color: var(--dark-color);
  background-color: var(--white-color);
  border: 0px;
  outline: none;
`;

// 뉴스 본문 영역
const NewsArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1270px;
  margin-top: 20px;
`;

// 그래프 영역
const GraphArea = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  align-items: center;
  padding-right: 30px;
`;

export default function News() {
  // 기능 코드 파트
  const navigate = useNavigate();
  const location = useLocation();

  // 하위 페이지로 이동
  const toNewsHome = () => {
    navigate('/news');
  };

  const toNewsNewest = () => {
    navigate('/news/newest');
  };

  const toNewsPolicies = () => {
    navigate('/news/policies');
  };

  const toNewsMarkets = () => {
    navigate('/news/markets');
  };

  const toNewsAnnounce = () => {
    navigate('/news/announce');
  };

  const toNewsInfos = () => {
    navigate('/news/infos');
  };

  return (
    <NewsContainer>
      <NewsNavContainer>
        <NewsNav>
          <NewsMenuArea>
            <NewsMenu active={location.pathname === '/news'} onClick={toNewsHome}>
              뉴스 홈
            </NewsMenu>
            <NewsMenu active={location.pathname === '/news/newest'} onClick={toNewsNewest}>
              최신뉴스
            </NewsMenu>
            <NewsMenu active={location.pathname === '/news/policies'} onClick={toNewsPolicies}>
              증권정책
            </NewsMenu>
            <NewsMenu active={location.pathname === '/news/markets'} onClick={toNewsMarkets}>
              시황
            </NewsMenu>
            <NewsMenu active={location.pathname === '/news/announce'} onClick={toNewsAnnounce}>
              공시
            </NewsMenu>
            <NewsMenu active={location.pathname === '/news/infos'} onClick={toNewsInfos}>
              기업정보
            </NewsMenu>
          </NewsMenuArea>
          <NewsSearchBarArea>
            <NewsSearchBar>
              <NewsSearchIcon />
              <NewsSearchTextbox />
            </NewsSearchBar>
          </NewsSearchBarArea>
        </NewsNav>
      </NewsNavContainer>
      <NewsArea>
        <Routes>
          <Route path="/" element={<NewsHome />} />
          <Route path="/newest" element={<NewsNewest />} />
          <Route path="/policies" element={<NewsPolicies />} />
          <Route path="/markets" element={<NewsMarkets />} />
          <Route path="/announce" element={<NewsAnnounce />} />
          <Route path="/infos" element={<NewsInfos />} />
        </Routes>
        <GraphArea>
          코스피 그래프<br />
          코스닥 그래프<br />
          코스피 200 그래프
        </GraphArea>
      </NewsArea>
    </NewsContainer>
  );
}
