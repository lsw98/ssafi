import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Doubts } from '../../assets/images/doubts-button.svg';

interface StyleProps {
  show: boolean;
}

interface TradeInputProps {
  isTrade: boolean;
  setIsTrade: React.Dispatch<React.SetStateAction<boolean>>;
}

const Container = styled.div`
  width: 480px;;
  height: 370px;
  margin: 30px 82px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  justify-content: space-between;
`;

const SelectBox = styled.div`
  position: relative;
  width: 98%;
  padding: 2% 1%;
  align-self: center;
  border-bottom: 2px solid var(--white-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  &::before {
    content: "⌵";
    position: absolute;
    top: 0px;
    right: 12px;
    color: var(--white-color);
    font-size: 28px;
  }
`;

const Label = styled.label`
  font-size: 22px;
  text-align: center;
  color: var(--white-color);
`;

const SelectOptions = styled.ul<StyleProps>`
  position: absolute;
  list-style: none;
  top: 28px;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 150px;
  max-height: ${(props) => (props.show ? 'none' : '0')};
  border-radius: 0 0 8px 8px;
  background-color: var(--white-color);
  color: var(--gray-color);
  overflow-y: auto;
`;

const Option = styled.li`
  font-size: 18px;
  padding: 6px 10px;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: var(--sub-color);
    color: var(--black-color);
  }
`;

const Notice = styled.div`
  font-size: 16px;
  font-weight: 300;
  padding: 6px 0;
  color: var(--point-color);
`;

const DoubtsButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const DoubtsButton = styled(Doubts)`
  width: 16px;
  fill: var(--point-color);
  margin-right:  4px;
  cursor: pointer;
`;

const Tooltip = styled.div<StyleProps>`
  width: 200px;
  position: absolute;
  top: 30px;
  right: 12px;
  background-color: var(--light-gray-color);
  color: var(--black-color);
  font-size: 14px;
  padding: 6px 12PX;
  border-radius: 6px;
  display: ${(props) => (props.show ? 'block' : 'none')};

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    right: 0px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent var(--light-gray-color) transparent transparent;
  }
`;

const RateContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;

const RateOfType = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const RightBox = styled.div`
  display: flex;
  justify-content: flex-end
`;

const Input = styled.input`
  width: 50%;
  padding: 0 5%;
  font-size: 20px;
  color: var(--white-color);
  background: none;
  border: none;
  border-bottom: 1px solid var(--white-color);
  margin-bottom: 2px;
  outline: none;

  &.ammount {
    width: 60%;
    text-align: right;
  }
`;

const StopBtn = styled.div<{stop: boolean}>`
  width: 172px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--point-color);
  font-size: 20px;
  color: ${(props) => (props.stop ? 'var(--point-color)' : 'var(--white-color)')};
  background: ${(props) => (props.stop ? '' : 'var(--point-color)')};
`;

export default function TradeInput({ isTrade, setIsTrade }: TradeInputProps) {
  const [currentValue, setCurrentValue] = useState('투자 성향');
  const [showOptions, setShowOptions] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  // 순서대로 안전, 중립, 위험 종목의 비율
  const [rateValues, setRateValues] = useState([0, 0, 0]);

  const handleOnChangeSelectValue = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const { innerText } = event.currentTarget;
    setCurrentValue(innerText);
  };

  const handleDoubtsButtonClick = () => {
    setShowTooltip((prev) => !prev); // 클릭 시 툴팁 표시/숨김 토글
  };

  const handleDoubtsButtonHover = (isHovered: boolean) => {
    setShowTooltip(isHovered);
  };

  // const handleRateInputChange = (index, value) => {
  //   // 입력 값이 유효한지 확인하고, 유효하지 않다면 값을 0으로 설정
  //   // const validValue = value ? value : 0;
  //   const newRateValues = [...rateValues];
  //   newRateValues[index] = value;
  //   setRateValues(newRateValues);
  // };

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

  return (
    <Container>
      <div>
        <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
          <Label>{currentValue}</Label>
          <SelectOptions show={showOptions}>
            {options.map((option, index) => (
              <Option key={index} onClick={handleOnChangeSelectValue}>
                {option}
              </Option>
            ))}
          </SelectOptions>
        </SelectBox>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Notice>금융 MBTI 결과를 바탕으로 종목별 주식 투자 비율을 추천해드려요.</Notice>
          <DoubtsButtonWrapper
            onMouseEnter={() => handleDoubtsButtonHover(true)}
            onMouseLeave={() => handleDoubtsButtonHover(false)}
          >
            <DoubtsButton onClick={handleDoubtsButtonClick}/>
            {showTooltip && (
              <Tooltip show={showTooltip}>
                아직 나의 금융 MBTI를 모르시나요?
                <br /> 금융 MBTI 알아보러 가기
              </Tooltip>
            )}
          </DoubtsButtonWrapper>
        </div>
      </div>
      <div>
        <RateContainer>
          <RateOfType>
            <Label>안전</Label>
            <Input
              value={rateValues[0]}
              // onChange={(e) => handleRateInputChange(0, parseInt(e.target.value, 10))}
            />
          </RateOfType>
          <RateOfType>
            <Label>중립</Label>
            <Input
              value={rateValues[1]}
              // onChange={(e) => handleRateInputChange(1, parseInt(e.target.value, 10))}
            />
          </RateOfType>
          <RateOfType>
            <Label>위험</Label>
            <Input
              value={rateValues[2]}
              // onChange={(e) => handleRateInputChange(2, parseInt(e.target.value, 10))}
            />
          </RateOfType>
        </RateContainer>
        <Notice>원하시는 투자 비율을 퍼센트(%) 단위로 입력해주세요.</Notice>
      </div>
      <RateContainer>
        <Label>투자 금액</Label>
        <Input className='ammount' />
      </RateContainer>
      <RateContainer>
        <Label>투자 금액</Label>
        <Input className='ammount' />
      </RateContainer>
      <RightBox>
        <StopBtn
          stop={isTrade}
          onClick={() => setIsTrade(!isTrade)}
        >
        {isTrade ? 'AI 투자 중지하기' : 'AI 투자 시작하기'}
        </StopBtn>
      </RightBox>
    </Container>
  );
}
