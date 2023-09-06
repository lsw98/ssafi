import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles.css';
import darkLogo from '../../assets/logos/logo-dark.png';

export default function Header() {
  const location = useLocation();

  const toMain = () => {
    window.location.href = '/';
  };

  const toPortfolio = () => {
    window.location.href = '/survey';
  };

  return (
    <div className='nav-area'>
      <div className='navbar'>
        <div className='navbar-left'>
          <div className='site-logo' onClick={toMain}>
            <img src={darkLogo} height={33} ></img>
          </div>
          <div className='site-menu'>
            <p>AI 트레이딩</p>
          </div>
          <div className='site-menu' onClick={toPortfolio}>
            <p style={ (location.pathname === '/survey')
              ? { color: 'var(--point-color)' } : { color: 'var(--white-color)' }}>포트폴리오</p>
          </div>
          <div className='site-menu'>
            <p>뉴스</p>
          </div>
        </div>
        <div className='navbar-right'>
          <div className='login'>
            <p>로그인</p>
          </div>
        </div>
      </div>
    </div>
  );
}
