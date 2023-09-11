import React from 'react';
import {
  Routes, Route, useNavigate, useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import TradeApi from './components/Trade/TradeApi';
import TradeAI from './components/Trade/TradeAI';
import TradeOrder from './components/Trade/TradeOrder';
import TradeAccount from './components/Trade/TradeAccount';

interface TradeMenuProps {
  active?: boolean;
}

const TradeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1270px;
  align-items: center;
`;

const TradeNavContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 58px;
  width: 100%;
  border-bottom: 1px solid var(--gray-color);
`;

const TradeMenuArea = styled.div`
  display: flex;
  align-items: center;
  width: 1270px;
  padding: 0px 30px;
  gap: 30px;
`;

const TradeMenu = styled.div<TradeMenuProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  padding: 0px 10px;
  cursor: pointer;
  height: ${(props) => (props.active ? '55px' : '58px')};
  color: ${(props) => (props.active ? 'var(--dark-color)' : 'var(--gray-color)')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  border-bottom: ${(props) => (props.active ? '3px solid var(--dark-color)' : '0px')};
  padding-top: ${(props) => (props.active ? '2px' : '0px')};
`;

const TradeArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1270px;
  padding: 0px 30px;
`;

export default function Trade() {
  // 기능 코드 파트
  const navigate = useNavigate();
  const location = useLocation();

  const toAI = () => {
    // 임시로 설정
    const hasAPI = false;
    // const hasAPI = true;

    if (!hasAPI) {
      navigate('/trade/api');
    } else {
      navigate('/trade');
    }
  };

  const toOrder = () => {
    navigate('/trade/order');
  };

  const toAccount = () => {
    navigate('/trade/account');
  };

  return (
    <TradeContainer>
      <TradeNavContainer>
        <TradeMenuArea>
          <TradeMenu active={location.pathname === '/trade' || location.pathname === '/trade/api'} onClick={toAI}>
            AI
          </TradeMenu>
          <TradeMenu active={location.pathname === '/trade/order'} onClick={toOrder}>
            빠른주문
          </TradeMenu>
          <TradeMenu active={location.pathname === '/trade/account'} onClick={toAccount}>
            내 계좌
          </TradeMenu>
        </TradeMenuArea>
      </TradeNavContainer>
      <TradeArea>
        <Routes>
          <Route path="/" element={<TradeAI />} />
          <Route path="/api" element={<TradeApi />} />
          <Route path="/order" element={<TradeOrder />} />
          <Route path="/account" element={<TradeAccount />} />
        </Routes>
      </TradeArea>
    </TradeContainer>
  );
}
