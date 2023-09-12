import React from 'react';
import styled from 'styled-components';

import btnArrow from '../../assets/images/button-arrow.png';
// API로 대체될 예정인 뉴스 데이터, 이미지
import tempNews from '../../assets/temp.json';
import tempImage from '../../assets/images/temp-image.png';

// NewsItem 타입 정의
interface NewsItem {
  title: string;
  content: string;
  img_src: string;
  created_at: string;
}

// styled-component 파트

// 위 테두리가 존재하는 가장 위 box
const NewsListTopBox = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 800px;
border-top: 1px solid var(--black-color);
border-bottom: 1px solid var(--black-color);
margin: 0px;
padding: 18px 0px;
`;

// 그 밑의 box
const NewsListBox = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 800px;
border-bottom: 1px solid var(--black-color);
margin: 0px;
padding: 18px 0px;
`;

// box의 텍스트 부분
const NewsTextContainer = styled.div`
width: 520px;
`;

// 텍스트 중 제목 부분
const NewsTextTitle = styled.p`
font-size: 24px;
font-weight: 500;
color: var(--black-color);
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
margin-top: 0px;
`;

// 텍스트 중 내용 부분
const NewsTextContent = styled.p`
font-size: 18px;
font-weight: 400;
text-align: justify;
color: var(--gray-color);
white-space: normal;
overflow: hidden;
text-overflow: ellipsis;

display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
`;

// 기사 생성 시각
const NewsTextCreatedAt = styled.p`
font-size: 18px;
font-weight: 400;
color: var(--gray-color);
margin-bottom: 0px;
`;

// 뉴스 썸네일
const NewsListImage = styled.img`
width: 260px;
height: 156px;
`;

// 더보기 버튼
const LoadBtn = styled.button`
display: flex;
align-items: center;
color: var(--dark-color);
font-size: 18px;
font-weight: 400;
padding: 10px 12px;
background-color: var(--white-color);
border: 1px solid var(--gray-color);
margin-top: 50px;
margin-bottom: 30px;
`;

// 버튼 내의 화살표 이미지
const BtnArrow = styled.img.attrs({
  src: btnArrow,
})`
  width: 15px;
  margin-left: 5px;
  transform: rotate(90deg);
`;

// 전부 로딩 후 버튼을 대체할 빈 공간
const EmptyDiv = styled.div`
margin: 80px;
`;

export default function NewsHomeList() {
  // 뉴스를 가져온 횟수 newsCount
  const [newsCount, setNewsCount] = React.useState<number>(0);
  // 새로 가져온 뉴스의 JSX 코드를 담을 리스트 newsList
  const [newsList, setNewsList] = React.useState<Array<JSX.Element>>([]);
  const tempNewsList: Array<NewsItem> = tempNews.data.slice(0, 4);

  // newsCount의 상태 변화에 따라 newsList에 뉴스를 추가하는 함수
  React.useEffect(() => {
    const loadMoreNews = () => {
      // 기존에 뉴스가 4개이므로 다음과 같이 baseNum 설정
      // baseNum은 key 부여를 위해 사용
      const baseNum = (newsCount - 1) * 8 + 4;
      // API로 대체될 예정인 뉴스 데이터
      const loadedNewsList: Array<NewsItem> = tempNews.data.slice(baseNum, baseNum + 8);
      // 뉴스 JSX 코드
      const loadedNews = [
        <NewsListBox key={baseNum + 1}>
          <NewsTextContainer>
            <NewsTextTitle>{loadedNewsList[0].title}</NewsTextTitle>
            <NewsTextContent>{loadedNewsList[0].content}</NewsTextContent>
            <NewsTextCreatedAt>{`${baseNum + 1}시간 전`}</NewsTextCreatedAt>
          </NewsTextContainer>
        <NewsListImage src={tempImage} />
        </NewsListBox>,
        <NewsListBox key={baseNum + 2}>
          <NewsTextContainer>
            <NewsTextTitle>{loadedNewsList[1].title}</NewsTextTitle>
            <NewsTextContent>{loadedNewsList[1].content}</NewsTextContent>
            <NewsTextCreatedAt>{`${baseNum + 2}시간 전`}</NewsTextCreatedAt>
          </NewsTextContainer>
        <NewsListImage src={tempImage} />
        </NewsListBox>,
        <NewsListBox key={baseNum + 3}>
          <NewsTextContainer>
            <NewsTextTitle>{loadedNewsList[2].title}</NewsTextTitle>
            <NewsTextContent>{loadedNewsList[2].content}</NewsTextContent>
            <NewsTextCreatedAt>{`${baseNum + 3}시간 전`}</NewsTextCreatedAt>
          </NewsTextContainer>
        <NewsListImage src={tempImage} />
        </NewsListBox>,
        <NewsListBox key={baseNum + 4}>
          <NewsTextContainer>
            <NewsTextTitle>{loadedNewsList[3].title}</NewsTextTitle>
            <NewsTextContent>{loadedNewsList[3].content}</NewsTextContent>
            <NewsTextCreatedAt>{`${baseNum + 4}시간 전`}</NewsTextCreatedAt>
          </NewsTextContainer>
        <NewsListImage src={tempImage} />
        </NewsListBox>,
        <NewsListBox key={baseNum + 5}>
          <NewsTextContainer>
            <NewsTextTitle>{loadedNewsList[4].title}</NewsTextTitle>
            <NewsTextContent>{loadedNewsList[4].content}</NewsTextContent>
            <NewsTextCreatedAt>{`${baseNum + 5}시간 전`}</NewsTextCreatedAt>
          </NewsTextContainer>
        <NewsListImage src={tempImage} />
        </NewsListBox>,
        <NewsListBox key={baseNum + 6}>
          <NewsTextContainer>
            <NewsTextTitle>{loadedNewsList[5].title}</NewsTextTitle>
            <NewsTextContent>{loadedNewsList[5].content}</NewsTextContent>
            <NewsTextCreatedAt>{`${baseNum + 6}시간 전`}</NewsTextCreatedAt>
          </NewsTextContainer>
        <NewsListImage src={tempImage} />
        </NewsListBox>,
        <NewsListBox key={baseNum + 7}>
          <NewsTextContainer>
            <NewsTextTitle>{loadedNewsList[6].title}</NewsTextTitle>
            <NewsTextContent>{loadedNewsList[6].content}</NewsTextContent>
            <NewsTextCreatedAt>{`${baseNum + 7}시간 전`}</NewsTextCreatedAt>
          </NewsTextContainer>
        <NewsListImage src={tempImage} />
        </NewsListBox>,
        <NewsListBox key={baseNum + 8}>
          <NewsTextContainer>
            <NewsTextTitle>{loadedNewsList[7].title}</NewsTextTitle>
            <NewsTextContent>{loadedNewsList[7].content}</NewsTextContent>
            <NewsTextCreatedAt>{`${baseNum + 8}시간 전`}</NewsTextCreatedAt>
          </NewsTextContainer>
        <NewsListImage src={tempImage} />
        </NewsListBox>,
      ];
      // 기존 newsList에 loadedNews를 더한 배열을 newsList로 설정
      setNewsList([...newsList, ...loadedNews]);
    };
    if (newsCount !== 0) {
      loadMoreNews();
    }
  }, [newsCount]);

  // 더보기 버튼 누른 횟수
  // 4번 로드하면 더보기 버튼이 사라지고 빈 공간으로 대체할 예정
  const handleNewsCount: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNewsCount(newsCount + 1);
  };

  return (
    <>
      <NewsListTopBox key={1}>
        <NewsTextContainer>
          <NewsTextTitle>{tempNewsList[0].title}</NewsTextTitle>
          <NewsTextContent>{tempNewsList[0].content}</NewsTextContent>
          <NewsTextCreatedAt>{tempNewsList[0].created_at}</NewsTextCreatedAt>
        </NewsTextContainer>
        <NewsListImage src={tempImage} />
      </NewsListTopBox>
      <NewsListBox key={2}>
        <NewsTextContainer>
          <NewsTextTitle>{tempNewsList[1].title}</NewsTextTitle>
          <NewsTextContent>{tempNewsList[1].content}</NewsTextContent>
          <NewsTextCreatedAt>{tempNewsList[1].created_at}</NewsTextCreatedAt>
        </NewsTextContainer>
        <NewsListImage src={tempImage} />
      </NewsListBox>
      <NewsListBox key={3}>
        <NewsTextContainer>
          <NewsTextTitle>{tempNewsList[2].title}</NewsTextTitle>
          <NewsTextContent>{tempNewsList[2].content}</NewsTextContent>
          <NewsTextCreatedAt>{tempNewsList[2].created_at}</NewsTextCreatedAt>
        </NewsTextContainer>
        <NewsListImage src={tempImage} />
      </NewsListBox>
      <NewsListBox key={4}>
        <NewsTextContainer>
          <NewsTextTitle>{tempNewsList[3].title}</NewsTextTitle>
          <NewsTextContent>{tempNewsList[3].content}</NewsTextContent>
          <NewsTextCreatedAt>{tempNewsList[3].created_at}</NewsTextCreatedAt>
        </NewsTextContainer>
        <NewsListImage src={tempImage} />
      </NewsListBox>
      {newsList}
      <div>
        {newsCount === 4
          ? <EmptyDiv />
          : <LoadBtn onClick={handleNewsCount}>
            더보기
            <BtnArrow />
          </LoadBtn>}
      </div>
    </>
  );
}
