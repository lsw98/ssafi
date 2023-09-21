import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Doubts } from '../../assets/images/doubts-button.svg';

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

const SelectOptions = styled.ul<{show: boolean}>`
  position: absolute;
  list-style: none;
  top: 32px;
  left: 0;
  width: 91.5%;
  overflow: hidden;
  height: 150px;
  max-height: ${(props) => (props.show ? 'none' : '0')};
  border-radius: 0 0 8px 8px;
  background-color: var(--white-color);
  color: var(--gray-color);
  overflow-y: auto;
  z-index: 1;
`;

const Option = styled.li`
  font-size: 18px;
  padding: 6px 0;
  transition: background-color 0.2s ease-in;
  &:hover {
    font-size: 19px;
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

const Tooltip = styled.div`
  width: 200px;
  position: absolute;
  top: 30px;
  right: 12px;
  background-color: var(--light-gray-color);
  color: var(--black-color);
  font-size: 14px;
  padding: 6px 12PX;
  border-radius: 6px;
  display: 'block';
  animation: ${keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `} 0.3s ease-in-out;

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
  justify-content: flex-end;
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
  text-align: center;

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

const createInputHandler = (setter:React.Dispatch<React.SetStateAction<number>>) => (
  event:React.ChangeEvent<HTMLInputElement>,
) => {
  const newValue = Number.parseInt(event.target.value, 10);
  setter(newValue);
};

export default function TradeInput({ isTrade, setIsTrade }: TradeInputProps) {
  const [currentValue, setCurrentValue] = useState('투자 성향');
  const [showOptions, setShowOptions] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [safetyRatio, setSafetyRatio] = useState(0);
  const [neutralRatio, setNeutralRatio] = useState(0);
  const [riskRatio, setRiskRatio] = useState(0);
  const [aiBudget, setAiBudget] = useState(0);
  const [aiGoal, setAiGoal] = useState(0);

  const handleOnChangeSelectValue = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const { innerText } = event.currentTarget;
    setCurrentValue(innerText);

    const selectedOption = options.find((option) => option.type === innerText);
    if (selectedOption) {
      setSafetyRatio(selectedOption.rates[0]);
      setNeutralRatio(selectedOption.rates[1]);
      setRiskRatio(selectedOption.rates[2]);
    }
  };

  const options = [
    {
      type: '타고난 리더형 투자 지도자(APML)',
      rates: [25, 68, 7],
    },
    {
      type: '박학다식한 투자의 달인(APMC)',
      rates: [100, 0, 0],
    },
    {
      type: '똘똘한 분산투자 능력자(APWL)',
      rates: [10, 80, 10],
    },
    {
      type: '당당하고 유능한 투자자(APWC)',
      rates: [0, 100, 0],
    },
    {
      type: '똑똑한 투자 트렌디세터(ABML)',
      rates: [1, 2, 97],
    },
    {
      type: '시대를 앞서는 투자 리더(ABMC)',
      rates: [58, 26, 16],
    },
    {
      type: '용감한 투자 탐정가(ABWL)',
      rates: [22, 55, 23],
    },
    {
      type: '통찰력있는 투자 예술인(ABWC)',
      rates: [20, 50, 30],
    },
    {
      type: '전략적인 투자 연구자(IPML)',
      rates: [25, 68, 7],
    },
    {
      type: '미래지향적 투자 탐험가(IPMC)',
      rates: [25, 68, 7],
    },
    {
      type: '노련한 투자의 아이콘(IPWL)',
      rates: [68, 25, 7],
    },
    {
      type: '다재다능한 투자 지휘관(IPWC)',
      rates: [38, 12, 50],
    },
    {
      type: '도전을 즐기는 투자 샛별(IBML)',
      rates: [50, 20, 30],
    },
    {
      type: '탐구하는 투자 탐색가(IBMC)',
      rates: [20, 40, 40],
    },
    {
      type: '호기심 가득한 투자 관찰가(IBWL)',
      rates: [25, 50, 25],
    },
    {
      type: '잠재력있는 새싹 투자자(IBWC)',
      rates: [33, 33, 34],
    },
  ];

  return (
    <Container>
      <div>
        <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
          <Label>{currentValue}</Label>
          <SelectOptions show={showOptions}>
            {options.map((option, index) => (
              <Option key={index} onClick={handleOnChangeSelectValue}>
                {option.type}
              </Option>
            ))}
          </SelectOptions>
        </SelectBox>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Notice>금융 MBTI 결과를 바탕으로 종목별 주식 투자 비율을 추천해드려요.</Notice>
          <DoubtsButtonWrapper
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <DoubtsButton/>
            {showTooltip && (
              <Tooltip>아직 나의 금융 MBTI를 모르시나요?<br /> 금융 MBTI 알아보러 가기</Tooltip>
            )}
          </DoubtsButtonWrapper>
        </div>
      </div>
      <div>
        <RateContainer>
          <RateOfType>
            <Label>안전</Label>
            <Input
              type='number' min='0' max='100'value={safetyRatio} onChange={createInputHandler(setSafetyRatio)}
            />
          </RateOfType>
          <RateOfType>
            <Label>중립</Label>
            <Input
              type='number' min='0' max='100' value={neutralRatio} onChange={createInputHandler(setNeutralRatio)}
            />
          </RateOfType>
          <RateOfType>
            <Label>위험</Label>
            <Input
              type='number' min='0' max='100' value={riskRatio} onChange={createInputHandler(setRiskRatio)}
            />
          </RateOfType>
        </RateContainer>
        <Notice>원하시는 투자 비율을 퍼센트(%) 단위로 입력해주세요.</Notice>
      </div>
      <RateContainer>
        <Label>투자 금액</Label>
        <Input
          type='number' min='0' className='ammount' value={aiBudget} onChange={createInputHandler(setAiBudget)}
        />
      </RateContainer>
      <RateContainer>
        <Label>목표 금액</Label>
        <Input
          type='number' min='0' className='ammount' value={aiGoal} onChange={createInputHandler(setAiGoal)}
        />
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
