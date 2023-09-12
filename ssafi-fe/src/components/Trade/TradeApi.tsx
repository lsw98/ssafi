import React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  dark?: boolean;
}

const ApiContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  position: relative;
`;

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.dark ? 'flex-end' : 'center')};
  width: ${(props) => (props.dark ? '1100px' : '470px')};
  height: ${(props) => (props.dark ? '210px' : '300px')};
  position: absolute;
  top: 50%;
  left: ${(props) => (props.dark ? '50%' : '25%')};
  transform: ${(props) => (props.dark ? 'translate(-50%, -50%)' : 'translate(-40%, -50%)')};
  background-color: ${(props) => (props.dark ? 'var(--dark-color)' : 'var(--white-color)')};
  box-shadow: ${(props) => (props.dark ? 'none' : '4px 4px 12px rgba(0, 0, 0, 0.2)')};
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

export default function TradeApi() {
  const [Api, setApi] = React.useState<string>('');

  const openApiPage = () => {
    // 임시로 구글..
    window.open('https://www.google.com/', '_blank');
  };

  const handleApiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 값이 변경될 때마다 Api 상태를 업데이트
    setApi(event.target.value);
  };

  const handleButtonClick = () => {
    // axios 요청
  };

  return (
    <ApiContainer>
      <Container dark={true}>
        <div style={{ width: '530px' }}>
          <InnerContainer>
            <Text className='title'>API Key가 없으신가요?</Text>
            <Text>SSAFI에서는 ~~님의 api key를 통해 ~~하고 있으며, <br />
              api key 인증한 회원에 한해 ai 트레이딩 서비스를 제공하고 있습니다.</Text>
            <Text onClick={openApiPage}>API Key 발급받으러 가기 &gt;</Text>
          </InnerContainer>
        </div>
      </Container>
      <Container dark={false}>
        <InnerContainer>
          <InputKey>API Key를 입력해주세요.</InputKey>
          <InputBox
            placeholder="API Key를 입력하세요"
            value={Api}
            onChange={handleApiChange}
          />
          <InputKey className='button' onClick={handleButtonClick}>입력하기</InputKey>
        </InnerContainer>
      </Container>
    </ApiContainer>
  );
}
