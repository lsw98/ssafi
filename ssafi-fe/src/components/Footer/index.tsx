import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import darkLogo from '../../assets/logos/logo-dark.png';

// styled-component 파트
const FooterContainer = styled.div`
  display: flex;
  min-width: 1270px;
  height: 150px;
  justify-content: center;
  color: var(--white-color);
  background-color: var(--dark-color);
`;

const FooterArea = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1270px;
  align-items: start;
  padding: 30px;
`;

const FooterLogo = styled.img.attrs({
  src: `${darkLogo}`,
})`
  height: 28px;
  margin-top: 3px
`;

const FooterText = styled.div`
  width: 270px;
  color: var(--white-color)
`;

const FooterTitle = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin: 0px;
`;

const FooterContent = styled.p`
  font-weight: 500;
  font-size: 12px;
  margin-top: 18px
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterArea>
        <FooterLogo />
        <FooterText>
          <FooterTitle>
            Our Service
          </FooterTitle>
          <FooterContent>
            대충서비스내용대충서비스내용대충서비스내용대충서비스내용대충서비스내용대충서비스내용대충서비스내용대충서비스내용대충서비스내용대충서비스내용대충서비스내용
          </FooterContent>
        </FooterText>
        <FooterText>
          <FooterTitle>
            Notice
          </FooterTitle>
          <FooterContent>
            대충공지내용대충공지내용대충공지내용대충공지내용대충공지내용대충공지내용대충공지내용대충공지내용대충공지내용대충공지내용대충공지내용대충공지내용대충공지내용
          </FooterContent>
        </FooterText>
        <FooterText>
          <FooterTitle>
            Inquiry
          </FooterTitle>
          <FooterContent>
            문의 시 연락처<br />
            대충 이메일<br />
            또는 전화번호<br />
          </FooterContent>
        </FooterText>
      </FooterArea>
    </FooterContainer>
  );
}
