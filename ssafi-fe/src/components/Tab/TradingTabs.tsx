import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import './TradingTabs.css';
// 뉴스 검색바 영역 (이후 확장성을 위해 만들어둠)

const PriceList = styled.div`
display-flex;
justify-content: start;
width:30%;
height: 90%;
`;

const TradingBox = styled.div`
  display: flex;
  width: 70%;
  height: 90%;
  padding: 11px 10px 9px 11px;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-left: 5%;
`;

const PriceDivision = styled.div`
  display: flex;
  width: 200px;
`;

const Specified = styled.div`
  display: flex;
  margin-right: 30%;
`;

const Market = styled.div`
  display: flex;
`;

const PriceAble = styled.div`
  display: flex;
  width: 200px;
`;
// 남은잔액 받아오기 import from 내계좌
const Budget = styled.div`
  display: flex;
  margin-left: auto;
`;

const InputAmount = styled.input`
  width: 200px;
`;

const InputPrice = styled.input`
  width: 200px;
`;

const InputTotal = styled.input`
  width: 200px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
`;

const ButtonReset = styled.button``;

const ButtonBuy = styled.button``;

const ButtonSell = styled.button``;

const ButtonCorrection = styled.button``;

function TradingTabs() {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  const [division, setDivision] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState('');

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="trading-container">
      <div className="bloc-tabs">
        <div
          className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          매수
        </div>
        <div
          className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          매도
        </div>
        <div
          className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(3)}
        >
          정정
        </div>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? 'content active-content' : 'content'}
        >
          <PriceList>호가</PriceList>
          <TradingBox>
            <PriceDivision>
              <Specified>지정</Specified>
              <Market>시장</Market>
            </PriceDivision>
            <PriceAble>
              주문가능
              <Budget>1000</Budget>
            </PriceAble>
            <InputAmount></InputAmount>
            <InputPrice></InputPrice>
            <InputTotal></InputTotal>
            <ButtonContainer>
              <ButtonReset onClick={handleOpenModal}>초기화</ButtonReset>
              <ButtonBuy onClick={handleOpenModal}>매수</ButtonBuy>
            </ButtonContainer>
          </TradingBox>
        </div>
        <div
          className={toggleState === 2 ? 'content active-content' : 'content'}
        >
          매도
        </div>
        <div
          className={toggleState === 3 ? 'content active-content' : 'content'}
        >
          정정
        </div>
      </div>
    </div>
  );
}

export default TradingTabs;
