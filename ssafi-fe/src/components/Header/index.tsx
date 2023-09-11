import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from 'styled-components';
import darkLogo from '../../assets/logos/logo-dark.png';

interface SiteMenuProps {
  active?: boolean;
}

// styled-component 파트
const NavContainer = styled.div`
  display: flex;
  min-width: 1270px;
  height: 60px;
  border-bottom: 1px solid var(--black-color);
  justify-content: center;
  color: var(--white-color);
  background-color: var(--dark-color);
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1270px;
  align-items: center;
  padding: 0px 30px;
`;

const NavbarLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SiteLogo = styled.img.attrs({
  src: `${darkLogo}`,
})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-right: 30px;
  height: 28px;
`;

const SiteMenu = styled.div<SiteMenuProps>`
  font-size: 24px;
  margin-left: 30px;
  cursor: pointer;
  color: ${(props) => (props.active ? 'var(--point-color)' : 'var(--white-color)')};
`;

const NavbarRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LoginButton = styled.div`
  font-size: 18px;
  cursor: pointer;
`;

export default function Header() {
  // 기능 코드 파트
  const navigate = useNavigate();
  const location = useLocation();

  const toMain = () => {
    navigate('/');
  };

  const toTrade = () => {
    navigate('/trade');
  };

  const toSurvey = () => {
    navigate('/survey');
  };

  return (
    <NavContainer>
      <Navbar>
        <NavbarLeft>
          <SiteLogo onClick={toMain} />
          <SiteMenu active={location.pathname.includes('/trade')} onClick={toTrade}>
            AI 트레이딩
          </SiteMenu>
          <SiteMenu active={location.pathname === '/survey'} onClick={toSurvey}>
            포트폴리오
          </SiteMenu>
          <SiteMenu active={location.pathname === '/news'}>
            뉴스
          </SiteMenu>
        </NavbarLeft>
        <NavbarRight>
          <LoginButton>
            로그인
          </LoginButton>
        </NavbarRight>
      </Navbar>
    </NavContainer>
  );
}
