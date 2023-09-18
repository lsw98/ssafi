import React, { useState } from 'react';
import styled from 'styled-components';
import handleScroll from '../../utils/scrollUtils';
import SemiCircleProgress from './SemiCircleProgress';
import { ReactComponent as EditBtn } from '../../assets/icons/edit.svg';
import TradeInput from './TradeInput';

interface StyleProps {
  weight?: number;
  width?: string;
  height?: string;
  color?: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-evenly;
  align-items: center;
  height: 704px;

  &.small {
    height: 624px;
  }
`;

const Title = styled.div<StyleProps>`
  font-size: 46px;
  font-weight: ${({ weight }) => weight || 500};
  color: ${({ color }) => color || 'var(--black-color)'};
  margin: 20px 0 40px 0;
`;

const BoxContainer = styled.div<StyleProps>`
  display: flex;
  width: 1000px;
  height: ${({ height }) => height || ''};
`;

const Box = styled.div<StyleProps>`
  width: ${({ width }) => width || '300px'};
  height: inhert;
  background-color: ${({ color }) => color || 'none'};
  padding: 0 20px;
`;

const Text = styled.div<StyleProps>`
  text-align: center;
  font-size: 30px;
  font-weight: 400;
  color: ${({ color }) => color || 'var(--white-color)'};
`;

const InputBox = styled.input`
  width: 80%;
  border: none;
  border-bottom: 1px solid var(--gray-color);
  outline: none;
  font-size: 18px;
  margin-top: 30px;
  
  &::placeholder {
    color: var(--gray-color);
    // padding: 5px;
  }
`;

const Row = styled.div`
  position: relative;
  top: 5%;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
`;

export default function TradeAi() {
  // hasResult: 분석 결과가 있는지를 나타내는 boolean(처음이 아닐 때) - 임시 데이터
  const hasResult = true;
  // ai 트레이딩이 진행 중인지 아닌지
  const [isTrade, setIsTrade] = useState(false);
  const [botName, setBotName] = useState('');
  const stockRateInfo = [
    {
      category: 'safe',
      percent: 35,
    },
    {
      category: 'middle',
      percent: 58,
    },
    {
      category: 'danger',
      percent: 7,
    },
  ];

  React.useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  const handleBotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBotName(event.target.value);
  };

  return (
    <Container>
      <SubContainer className='small'>
        <div style={{ display: 'flex', marginTop: '20px' }}>
          <Title weight={600} color='var(--point-color)'>{botName}</Title>
          <Title>이 주식 투자 중이에요</Title>
        </div>
        <BoxContainer height={'430px'}>
          <Box color='var(--white-color)'>
            <div style={{ margin: '120px' }} />
            <Text color='var(--dark-color)'>여러분의 SSAFI AI에 이름을 붙여주세요</Text>
            <Row>
              <InputBox
                placeholder="싸피봇"
                value={botName}
                onChange={handleBotNameChange}
              >
              </InputBox>
              <EditBtn />
            </Row>
          </Box>
          <Box width='700px' color='var(--dark-color)'>
            <TradeInput/>
          </Box>
        </BoxContainer>
      </SubContainer>
      {hasResult && <SubContainer>
        <Title color='var(--dark-color)'>진행 중인 투자 상황을 분석해드려요</Title>
        <BoxContainer>
          <Box>
            {stockRateInfo.map((item) => (
              <SemiCircleProgress color={item.category} percent={item.percent}/>
            ))}
          </Box>
          <Box width='700px' />
        </BoxContainer>
      </SubContainer>}
    </Container>
  );
}
