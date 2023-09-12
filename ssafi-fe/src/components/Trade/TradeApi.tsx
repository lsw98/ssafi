import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Doubts } from '../../assets/images/doubts-button.svg';
import ApiGuide from './ApiGuide';

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
  display:flex;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  color: var(--white-color);
  margin: 12px 0;

  &.small {
    font-size: 14px;
    line-height: 22px;
  }

  &.button {
    font-size: 16px;
    cursor: pointer;
  }
  `;

const InputKey = styled.div<{disabled: boolean}>`
  font-weight: 500;
  font-size: 24px;
  color: var(--point-color);
  margin: 20px 0;

  &.button {
    background-color: ${(props) => (props.disabled ? 'var(--light-gray-color)' : 'var(--point-color)')};
    color: var(--white-color);
    align-self: flex-end;
    padding: 4px 16px;
    cursor:  ${(props) => (props.disabled ? '' : 'pointer')};
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

const DoubtsButton = styled(Doubts)`
  fill: var(--white-color);
  margin-left: 10px;
  cursor: pointer;
`;

export default function TradeApi() {
  const [Api, setApi] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const openApiPage = () => {
    // 한국투자증권
    window.open('https://apiportal.koreainvestment.com/apiservice/oauth2#L_5c87ba63-740a-4166-93ac-803510bb9c02', '_blank');
  };

  const handleApiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 값이 변경될 때마다 Api 상태를 업데이트
    setApi(event.target.value);
  };

  const handleButtonClick = () => {
    if (Api !== '') {
      // axios 요청
      // 200 이면 ai 트레이딩 페이지로 이동 (임시로 그냥 이동)
      navigate('/trade');
    }
  };

  return (
    <ApiContainer>
      <Container dark={true}>
        <div style={{ width: '530px' }}>
          <InnerContainer>
            <Text>API Key가 없으신가요? <DoubtsButton onClick={handleOpenModal}/></Text>
            <Text className='small'>SSAFI에서는 한국투자증권 API Key를 통해 계좌 인증을 진행하고 있으며,
              <br />API Key를 인증한 회원에 한해 AI 트레이딩 서비스를 제공하고 있습니다.
            </Text>
            <Text className='button' onClick={openApiPage}>API Key 발급/확인하기 &gt;</Text>
          </InnerContainer>
        </div>
      </Container>
      <Container dark={false}>
        <InnerContainer>
          <InputKey disabled={false}>API Key를 입력해주세요.</InputKey>
          <InputBox
            placeholder="API Key를 입력하세요"
            value={Api}
            onChange={handleApiChange}
          />
          <InputKey disabled={Api === ''} className='button' onClick={handleButtonClick}>입력하기</InputKey>
        </InnerContainer>
      </Container>
      {modalOpen && (
        <ApiGuide
          closeModal={handleCloseModal}
        />
      )}
    </ApiContainer>
  );
}
