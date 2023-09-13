import React from 'react';
import styled from 'styled-components';
import handleScroll from '../../utils/scrollUtils';

interface StyleProps {
  weight?: number;
  width?: string;
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
  justify-content: space-evenly;
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
`;

const BoxContainer = styled.div`
  display: flex;
  width: 1000px;
  height: 430px;
`;

const Box = styled.div<StyleProps>`
  width: ${({ width }) => width || '300px'};
  height: 430px;
  background-color: ${({ color }) => color || 'none'};
`;

export default function TradeAi() {
  // hasResult: 분석 결과가 있는지를 나타내는 boolean(처음이 아닐 때) - 임시 데이터
  const hasResult = true;
  const botName = '싸피봇';

  React.useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <Container>
      <SubContainer className='small'>
        <div style={{ display: 'flex' }}>
          <Title weight={600} color='var(--point-color)'>{botName}</Title>
          <Title>이 주식 투자 중이에요</Title>
        </div>
        <BoxContainer>
          <Box color='var(--white-color)' />
          <Box width='700px' color='var(--dark-color)' />
        </BoxContainer>
      </SubContainer>
      {hasResult && <SubContainer>
        <Title color='var(--dark-color)'>진행 중인 투자 상황을 분석해드려요</Title>
        <BoxContainer>
          <Box></Box>
          <Box width='700px' />
        </BoxContainer>
      </SubContainer>}
    </Container>
  );
}
