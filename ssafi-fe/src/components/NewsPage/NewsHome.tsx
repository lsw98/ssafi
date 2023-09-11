import React from 'react';
import styled from 'styled-components';

import tempImage from '../../assets/images/temp-image.png';

const NewsHomeContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
`;

const MostViewedArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 800px;
`;

const MostViewedTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: var(--black-color);
`;

const MostViewedText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: var(--gray-color);
`;

const MostViewedNewsArea = styled.div`
display: flex;
justify-content: space-between;
width: 800px;
flex-wrap: wrap;
`;

const MostViewedNewsBox = styled.div`
width: 380px;
margin-bottom: 20px;
`;

const MostViewedNewsImage = styled.img`
width: 380px;
`;

const MostViewedNewsText = styled.div`
max-height: 2em;
line-height: 1em;
font-size: 16px;
font-weight: 600;
color: var(--black-color);
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

const MostViewedNewsTime = styled.p`
font-size: 14px;
font-weight: 500;
color: var(--gray-color);
`;

export default function NewsHome() {
  const tempTitle = '임시제목입니다. 뉴스 내용이 api로 넘어온다면 대체될 예정입니다.';
  const tempTime = '임시 1시간 전';

  return (
    <NewsHomeContainer>
      <MostViewedArea>
        <MostViewedTitle>
          많이 본 기사
        </MostViewedTitle>
        <MostViewedText>
          최근 2시간 기준
        </MostViewedText>
      </MostViewedArea>
      <MostViewedNewsArea>
        <MostViewedNewsBox>
          <MostViewedNewsImage src={tempImage}/>
          <MostViewedNewsText>
            {tempTitle}
          </MostViewedNewsText>
          <MostViewedNewsTime>
            {tempTime}
          </MostViewedNewsTime>
        </MostViewedNewsBox>
        <MostViewedNewsBox>
          <MostViewedNewsImage src={tempImage}/>
          <MostViewedNewsText>
            {tempTitle}
          </MostViewedNewsText>
          <MostViewedNewsTime>
            {tempTime}
          </MostViewedNewsTime>
        </MostViewedNewsBox>
        <MostViewedNewsBox>
          <MostViewedNewsImage src={tempImage}/>
          <MostViewedNewsText>
            {tempTitle}
          </MostViewedNewsText>
          <MostViewedNewsTime>
            {tempTime}
          </MostViewedNewsTime>
        </MostViewedNewsBox>
        <MostViewedNewsBox>
          <MostViewedNewsImage src={tempImage}/>
          <MostViewedNewsText>
            {tempTitle}
          </MostViewedNewsText>
          <MostViewedNewsTime>
            {tempTime}
          </MostViewedNewsTime>
        </MostViewedNewsBox>
      </MostViewedNewsArea>
    </NewsHomeContainer>
  );
}
