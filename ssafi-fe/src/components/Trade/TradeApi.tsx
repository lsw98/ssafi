import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as Doubts } from '../../assets/images/doubts-button.svg';
import ApiGuide from './ApiGuide';
import handleScroll from '../../utils/scrollUtils';

interface ContainerProps {
  dark?: boolean;
}

const ApiContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 628px;
  position: relative;
`;

const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.dark ? 'flex-end' : 'center')};
  width: ${(props) => (props.dark ? '1100px' : '470px')};
  height: ${(props) => (props.dark ? '300px' : '420px')};
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
  height: 70%;
`;

const Text = styled.div`
  display:flex;
  align-items: center;
  font-weight: 400;
  font-size: 20px;
  color: var(--white-color);
  margin: 16px 0;
  &.small {
    font-size: 16px;
    font-weight: 300;
    line-height: 26px;
  }
  &.button {
    font-size: 16px;
    cursor: pointer;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 5px 0;
`;

const InputName = styled.div<{visibled?: boolean}>`
  font-size: 20px;
  &.name {
    width: 31%;
    text-align: end;
  }

  &.header {
    font-weight: 500;
    font-size: 22px;
    color: var(--point-color);
  }

  &.button {
    background-color: ${(props) => (props.visibled ? 'var(--point-color)' : 'var(--light-gray-color)')};
    color: var(--white-color);
    align-self: flex-end;
    padding: 6px 20px;
    cursor:  ${(props) => (props.visibled ? 'pointer' : '')};
  }
`;

const Input = styled.input`
  width: 60%;
  border: none;
  border-bottom: 1px solid var(--gray-color);
  outline: none;
  font-size: 16px;
  margin: 20px 10px 0 0;
  padding: 0 0 1% 2%;
  
  &::placeholder {
    color: var(--gray-color);
  }
`;

const DoubtsButton = styled(Doubts)`
  fill: var(--white-color);
  margin-left: 10px;
  cursor: pointer;
`;

const Notice = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: var(--danger-color);
  margin: 2px 0 0 144px;
`;

export default function TradeApi() {
  React.useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const [apiKey, setApiKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
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
    // 입력 값이 변경될 때마다 apiKey 상태를 업데이트
    setApiKey(event.target.value);
  };

  const handleSecretChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 값이 변경될 때마다 apiKey 상태를 업데이트
    setSecretKey(event.target.value);
  };

  const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9]/g, '');
    setAccountNumber(newValue);
  };

  const handleButtonClick = () => {
    if (apiKey === '') {
      alert('API Key를 입력해 주세요!');
    } else if (secretKey === '') {
      alert('SECRET Key를 입력해 주세요!');
    } else if (accountNumber === '') {
      alert('계좌 번호를 입력해 주세요!');
    } else {
      // axios 요청
      // 200 이면 ai 트레이딩 페이지로 이동 (임시로 그냥 이동)
      navigate('/trade');
    }
  };

  return (
    <ApiContainer>
      <Container dark={true}>
        <div style={{ width: '540px' }}>
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
          <InputName className='header'>자동 투자를 위한 정보를 입력해주세요.</InputName>
          <div>
            <InputBox>
              <InputName className='name'>API Key :</InputName>
              <Input
                placeholder="API Key를 입력하세요"
                value={apiKey}
                onChange={handleApiChange}
              />
            </InputBox>
            <InputBox>
              <InputName className='name'>SECRET Key :</InputName>
              <Input
                placeholder="SECRET Key를 입력하세요"
                value={secretKey}
                onChange={handleSecretChange}
              />
            </InputBox>
            <InputBox>
              <InputName className='name'>계좌 번호 :</InputName>
              <Input
                placeholder="계좌 번호를 입력하세요"
                value={accountNumber}
                onChange={handleAccountChange}
              />
            </InputBox>
            <Notice>* 숫자만 입력해주세요.</Notice>
          </div>
          <InputName visibled={apiKey !== '' && secretKey !== '' && accountNumber !== ''} className='button' onClick={handleButtonClick}>
            입력하기
          </InputName>
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
