/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import styled from 'styled-components';

import NewsHome from './components/NewsPage/NewsHome';
import NewsNewest from './components/NewsPage/NewsNewest';
import NewsPolicies from './components/NewsPage/NewsPolicies';
import NewsMarkets from './components/NewsPage/NewsMarkets';
import NewsAnnounce from './components/NewsPage/NewsAnnounce';
import NewsInfos from './components/NewsPage/NewsInfos';
import searchIcon from './assets/icons/search-icon.svg';

interface NewsMenuProps {
  active?: boolean;
}

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1270px;
  align-items: center;
`;

const NewsNavContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 69px;
  width: 100%;
  border-bottom: 1px solid var(--gray-color);
`;

const NewsNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1270px;
  padding: 0px 30px;
`;

const NewsMenuArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 530px;
`;

const NewsMenu = styled.div<NewsMenuProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  height: ${(props) => (props.active ? '66px' : '69px')};
  color: ${(props) => (props.active ? 'var(--dark-color)' : 'var(--gray-color)')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  border-bottom: ${(props) => (props.active ? '3px solid var(--dark-color)' : '0px')};
  padding-top: ${(props) => (props.active ? '2px' : '0px')};
`;

const NewsSearchBarArea = styled.div`

`;

const NewsSearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 40px;
  border: 3px solid var(--dark-color);
  border-radius: 20px;
`;

const NewsSearchIcon = styled.img.attrs({
  src: `${searchIcon}`,
})`
  width: 30px;
`;

const NewsSearchTextbox = styled.input.attrs({
  placeholder: '검색할 단어를 입력하세요.',
})`
  width: 280px;
  height: 34px;
  margin-left: 15px; 
  font-size: 22px;
  color: var(--dark-color);
  border: 0px;
  outline: none;
`;

const NewsArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1270px;
  padding: 0px 30px;
`;

export default function News() {
  // 기능 코드 파트
  const navigate = useNavigate();
  const location = useLocation();

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
      </NewsArea>
    </NewsContainer>
  );
}
