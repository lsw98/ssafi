import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import './TradingTabs.css';
import { fetchBuyStock } from '../../utility/api';

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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  h1 {
    margin-top: 0;
    font-size: 24px;
  }
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

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

  const handleBuyStock = () => {
    // 매수 로직을 수행하는 fetchBuyStock 함수를 호출
    const stockCode = '005930'; // 예시 종목코드
    fetchBuyStock(stockCode)
      .then((response) => {
        // 성공적으로 매수가 완료되면 이 부분에서 처리할 로직을 작성
        console.log('매수 성공:', response);
        setModalOpen(false);
      })
      .catch((error) => {
        // 매수 실패시 이 부분에서 처리할 로직을 작성
        console.log('매수 실패:', error);
      });
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
              {modalOpen && (
                <Modal>
                  <ModalContent>
                    <h1>매수하시겠습니까?</h1>
                    <button onClick={handleCloseModal}>취소</button>
                    <button
                      onClick={() => {
                        handleBuyStock();
                      }}
                    >
                      확인
                    </button>
                  </ModalContent>
                </Modal>
              )}
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
