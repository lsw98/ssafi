import React from 'react';
import styled from 'styled-components';

const APIContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 477px;
  position: relative;
`;

const DarkContainer = styled.div`
  position: absolute;
  width: 1000px;
  height: 200px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark-color);
  color: var(--white-color);
`;

const WhiteContainer = styled.div`
  display: flex;
  align-content: space-around;
  position: absolute;
  width: 470px;
  height: 300px;
  position: absolute;
  left: 30%;
  top: 50%;
  transform: translate(-40%, -50%);
  background-color: var(--white-color);
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
`;

const InnerContainer = styled.div`
  width: 400px;

  &.dark {
    padding-left: 550px;
  }
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 24px;
  color: var(--white-color);
`;

export default function TradeAPI() {
  return (
    <APIContainer>
      <DarkContainer>
        <InnerContainer className='dark'>
          <Title>API Key가 없으신가요?</Title>
        </InnerContainer>
      </DarkContainer>
      <WhiteContainer>
        <InnerContainer>
          <Title style={{ color: 'var(--point-color)' }}>API Key를 입력해주세요.</Title>
        </InnerContainer>
      </WhiteContainer>
    </ APIContainer>
  );
}
