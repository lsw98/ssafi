import React from 'react';
import styled from 'styled-components';

const APIContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  position: relative;
`;

const DarkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1100px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark-color);
  color: var(--white-color);
`;

const WhiteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 470px;
  height: 300px;
  position: absolute;
  left: 25%;
  top: 50%;
  transform: translate(-40%, -50%);
  background-color: var(--white-color);
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 85%;
  height: 80%;
`;

const Text = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: var(--white-color);
  margin: 15px 0;

  &.title {
    font-size: 20px;
  }
`;

const InputKey = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: var(--point-color);
  margin: 20px 0;

  &.button {
    background-color: var(--point-color);
    color: var(--white-color);
    align-self: flex-end;
    padding: 4px 16px;
    cursor: pointer;
  }
`;

const InputBox = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--gray-color);
  outline: none;
  font-size: 18px;
  margin-top: 10px;
  
  &::placeholder {
    color: var(--gray-color);
  }
`;

export default function TradeAPI() {
  return (
    <APIContainer>
      <DarkContainer>
        <div style={{ width: '530px' }}>
          <InnerContainer>
            <Text className='title'>API Key가 없으신가요?</Text>
            <Text>SSAFI에서는 ~~님의 api key를 통해 ~~하고 있으며, <br/>
              api key 인증한 회원에 한해 ai 트레이딩 서비스를 제공하고 있습니다.</Text>
            <Text>API Key 발급받으러 가기 &gt;</Text>
          </InnerContainer>
        </div>
      </DarkContainer>
      <WhiteContainer>
        <InnerContainer>
          <InputKey>API Key를 입력해주세요.</InputKey>
          <InputBox placeholder="API Key를 입력하세요"/>
          <InputKey className='button'>입력하기</InputKey>
        </InnerContainer>
      </WhiteContainer>
    </ APIContainer>
  );
}
