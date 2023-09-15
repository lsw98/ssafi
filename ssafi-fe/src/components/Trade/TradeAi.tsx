import React from 'react';
import styled from 'styled-components';
import handleScroll from '../../utils/scrollUtils';
import SemiCircleProgress from './SemiCircleProgress';
import { ReactComponent as EditBtn } from '../../assets/icons/edit.svg';

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

const StyledSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:hover {
    border-color: #007bff;
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
`;

export default function TradeAi() {
  // hasResult: 분석 결과가 있는지를 나타내는 boolean(처음이 아닐 때) - 임시 데이터
  const hasResult = true;
  const botName = '싸피봇';
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
  const options = [
    '타고난 리더형 투자 지도자(APML)',
    '박학다식한 투자의 달인(APMC)',
    '똘똘한 분산투자 능력자(APWL)',
    '당당하고 유능한 투자자(APWC)',
    '똑똑한 투자 트렌디세터(ABML)',
    '시대를 앞서는 투자 리더(ABMC)',
    '용감한 투자 탐정가(ABWL)',
    '통찰력있는 투자 예술인(ABWC)',
    '전략적인 투자 연구자(IPML)',
    '미래지향적 투자 탐험가(IPMC)',
    '노련한 투자의 아이콘(IPWL)',
    '다재다능한 투자 지휘관(IPWC)',
    '도전을 즐기는 투자 샛별(IBML)',
    '탐구하는 투자 탐색가(IBMC)',
    '호기심 가득한 투자 관찰가(IBWL)',
    '잠재력있는 새싹 투자자(IBWC)',
  ];

  React.useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

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
                // value={Api}
                // onChange={handleApiChange}
              >
              </InputBox>
              <EditBtn />
            </Row>
          </Box>
          <Box width='700px' color='var(--dark-color)'>
          <StyledSelect>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </StyledSelect>
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
