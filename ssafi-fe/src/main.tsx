import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import mainImage from './assets/images/main-image.png';
import buttonArrow from './assets/images/button-arrow.png';

export default function Main() {
  const MainContainer = styled.div`
    display: flex;
    min-width: 1270px;
    justify-content: center;
  `;

  const MainBanner = styled.div`
    width: 1270px;
    margin-top: 75px;
    padding: 0px 30px;
    position: relative
  `;

  const BannerTitle = styled.p`
    font-size: 60px;
    font-weight: 600;
    color: var(--black-color);
  `;

  const BannerContent = styled.p`
    font-size: 28px;
    font-weight: 400;
    color: var(--gray-color);
  `;

  const ButtonDiv = styled.div`
    width: 510px;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
  `;

  const BannerBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--gradation-color);
    color: var(--dark-color);
    font-size: 28px;
    font-weight: 400;
    border: 0px;
    border-radius: 20px;
  `;

  const ButtonText = styled.p`
    margin: 10px;
  `;

  const ButtonArrow = styled.img.attrs({
    src: `${buttonArrow}`,
  })`
    width: 24px;
    margin-right: 10px;
  `;

  const BannerImg = styled.img.attrs({
    src: `${mainImage}`,
  })`
    width:  450px;
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 30px;
  `;

  return (
    <MainContainer>
      <MainBanner>
        <div>
          <BannerTitle>
            똑똑한 SSAFI AI로<br />일하는 동안에도 주식 투자하세요
          </BannerTitle>
          <BannerContent>
            AI 트레이딩 플랫폼 SSAFI는<br />
            사용자의 투자 스타일을 바탕으로 주식 거래를 돕습니다<br />
            <br />
            나의 투자 스타일을 확인하고 AI 트레이딩을 통해<br />
            더 똑똑하게 투자하세요
          </BannerContent>
          <ButtonDiv>
            <BannerBtn>
              <ButtonText>투자 성향 확인하기</ButtonText>
              <ButtonArrow />
            </BannerBtn>
            <BannerBtn>
              <ButtonText>AI 트레이딩</ButtonText>
              <ButtonArrow />
            </BannerBtn>
          </ButtonDiv>
        </div>
        <BannerImg />
      </MainBanner>
    </MainContainer>
  );
}
