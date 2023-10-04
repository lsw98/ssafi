import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './TradingTabs.css';
import {
  fetchBuyStock,
  fetchSellStock,
  fetchModifyStock,
  fetchAskingPrice,
} from '../../utility/api';
// import WebSocketComponent from '../../utility/webSockets';

const PriceList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 30%;
  height: 90%;
`;

const PriceItem = styled.div<{ color: string }>`
  color: ${(props) => props.color};

  .volume {
    font-size: 0.8em;
    color: black;
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
  gap: 10px;
`;

const PriceDivision = styled.div`
  display: flex;
  width: 200px;
`;

const Specified = styled.div`
  display: flex;
  margin-right: 30%;
  cursor: pointer;
`;

const Market = styled.div`
  display: flex;
  cursor: pointer;
`;

const PriceAble = styled.div`
  display: flex;
  width: 190px;
`;
// 남은잔액 받아오기 import from 내계좌
const Budget = styled.div`
  display: flex;
  margin-left: auto;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const InputLabel = styled.label`
  position: absolute;
  left: 10px; // 위치를 조절하여 input 내부에 텍스트를 정렬합니다.
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

interface InputSpanProps {
  right?: string;
}
const InputSpan = styled.span<InputSpanProps>`
  position: absolute;
  right: ${(props) => props.right || '75px'};
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;
const InputAmount = styled.input`
  width: 40px;
  padding-left: 20%;
  padding-right: 15%;
  text-align: right; // 텍스트를 오른쪽 정렬합니다.
`;

const InputPrice = styled.input`
  width: 120px;
  padding-left: 20%;
  padding-right: 15%;
  text-align: right; // 텍스트를 오른쪽 정렬합니다.
`;

const InputTotal = styled.input`
  width: 120px;
  padding-left: 20%;
  padding-right: 15%;
  text-align: right; // 텍스트를 오른쪽 정렬합니다.
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 190px;
  justify-content: space-between;
`;

const ButtonReset = styled.button``;

const ButtonBuy = styled.button``;

const ButtonSell = styled.button``;

const ButtonModify = styled.button``;

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
interface PriceData {
  askp1: number;
  askp2: number;
  askp3: number;
  bidp1: number;
  bidp2: number;
  bidp3: number;
  askp_rsqn1: number;
  askp_rsqn2: number;
  askp_rsqn3: number;
  bidp_rsqn1: number;
  bidp_rsqn2: number;
  bidp_rsqn3: number;
}

interface TradingTabsProps {
  stockCode: string;
}

function TradingTabs({ stockCode }: TradingTabsProps) {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  const [askingPrices, setAskingPrices] = useState<PriceData | null>(null);
  const [division, setDivision] = useState('00');
  const [isSpecifiedChecked, setSpecifiedChecked] = useState(false);
  const [isMarketChecked, setMarketChecked] = useState(false);
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState(0);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);

  useEffect(() => {
    const getAskingPrices = async () => {
      const prices = await fetchAskingPrice(stockCode);
      setAskingPrices(prices);
    };
    getAskingPrices();
  }, [stockCode]); // stockCode가 변경될 경우에만 useEffect가 다시 실행됩니다.

  const handleSpecifiedClick = () => {
    if (division === '00') {
      setDivision(''); // 지정이 이미 선택되어 있다면 선택 해제
      setSpecifiedChecked(false);
    } else {
      setDivision('00'); // 지정을 선택
      setSpecifiedChecked(true);
      setMarketChecked(false); // 시장은 선택 해제
      setPrice(''); // 지정가 선택 시, 가격을 초기화
    }
  };

  const handleMarketClick = () => {
    if (division === '01') {
      setDivision(''); // 시장이 이미 선택되어 있다면 선택 해제
      setMarketChecked(false);
      setPrice(''); // 시장가 선택 해제 시, 가격을 초기화
    } else {
      setDivision('01'); // 시장을 선택
      setMarketChecked(true);
      setSpecifiedChecked(false); // 지정은 선택 해제
      // 시장가 선택 시, 매도호가 중 askingPrices.askp1를 가격으로 설정
      if (askingPrices) {
        setPrice(askingPrices.askp1.toString()); // 숫자를 문자열로 변환
      }
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    // amount와 price가 숫자형태이면 아래와 같이 곱셈을 바로 할 수 있습니다.
    setTotal(Number(amount) * Number(price));
  }, [amount, price]); // amount나 price 상태가 변경될 때마다 이 훅을 실행

  const handleOpenBuyModal = () => {
    setBuyModalOpen(true);
  };
  const handleOpenSellModal = () => {
    setSellModalOpen(true);
  };
  const handleOpenModifyModal = () => {
    setModifyModalOpen(true);
  };

  const handleCloseBuyModal = () => {
    setBuyModalOpen(false);
  };
  const handleCloseSellModal = () => {
    setSellModalOpen(false);
  };
  const handleCloseModifyModal = () => {
    setModifyModalOpen(false);
  };

  const handleBuyStock = () => {
    fetchBuyStock(stockCode, division, amount, price)
      .then((response) => {
        console.log('매수 성공:', response);
        setBuyModalOpen(false);
      })
      .catch((error) => {
        console.log('매수 실패:', error);
      });
  };

  const handleSellStock = () => {
    fetchSellStock(stockCode, division, amount, price)
      .then((response) => {
        console.log('매도 성공:', response);
        setSellModalOpen(false);
      })
      .catch((error) => {
        console.log('매도 실패:', error);
      });
  };

  const handleModifyStock = () => {
    fetchModifyStock(stockCode, division, amount, price)
      .then((response) => {
        console.log('정정 성공:', response);
        setModifyModalOpen(false);
      })
      .catch((error) => {
        console.log('정정 실패:', error);
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
          <PriceList>
            {askingPrices ? (
              <>
                <PriceItem color="blue">
                  {askingPrices.askp3}
                  <div className="volume">{askingPrices.askp_rsqn3}</div>
                </PriceItem>
                <PriceItem color="blue">
                  {askingPrices.askp2}
                  <div className="volume">{askingPrices.askp_rsqn2}</div>
                </PriceItem>
                <PriceItem color="blue">
                  {askingPrices.askp1}
                  <div className="volume">{askingPrices.askp_rsqn1}</div>
                </PriceItem>
              </>
            ) : (
              <div>Loading...</div>
            )}

            {askingPrices ? (
              <>
                <PriceItem color="red">
                  {askingPrices.bidp1}
                  <div className="volume">{askingPrices.bidp_rsqn1}</div>
                </PriceItem>
                <PriceItem color="red">
                  {askingPrices.bidp2}
                  <div className="volume">{askingPrices.bidp_rsqn2}</div>
                </PriceItem>
                <PriceItem color="red">
                  {askingPrices.bidp3}
                  <div className="volume">{askingPrices.bidp_rsqn3}</div>
                </PriceItem>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </PriceList>
          <TradingBox>
            <PriceDivision>
              <Specified onClick={handleSpecifiedClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    fill="#FDFDFD"
                    stroke="#858585"
                  />
                  {isSpecifiedChecked && (
                    <path
                      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
                      fill="#4AC49E"
                    />
                  )}
                </svg>
                지정
              </Specified>
              <Market onClick={handleMarketClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    fill="#FDFDFD"
                    stroke="#858585"
                  />
                  {isMarketChecked && (
                    <path
                      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
                      fill="#4AC49E"
                    />
                  )}
                </svg>
                시장
              </Market>
            </PriceDivision>
            <PriceAble>
              주문가능
              <Budget>
                1000
                {/* {계좌잔고} */}
              </Budget>
            </PriceAble>
            <InputWrapper>
              <InputLabel>수량</InputLabel>
              <InputAmount
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
              />
              <InputSpan>주</InputSpan>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>가격</InputLabel>
              <InputPrice
                placeholder="0"
                value={price}
                onChange={handlePriceChange}
              />
              <InputSpan right="1px">원</InputSpan>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>총액</InputLabel>
              <InputTotal placeholder="0" value={total} />
              <InputSpan right="1px">원</InputSpan>
            </InputWrapper>
            <ButtonContainer>
              <ButtonReset onClick={handleOpenBuyModal}>초기화</ButtonReset>
              <ButtonBuy onClick={handleOpenBuyModal}>매수</ButtonBuy>
              {buyModalOpen && (
                <Modal>
                  <ModalContent>
                    <h1>매수하시겠습니까?</h1>
                    <button onClick={handleCloseBuyModal}>취소</button>
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
          <PriceList>
            {askingPrices ? (
              <>
                <PriceItem color="blue">
                  {askingPrices.askp3}
                  <div className="volume">{askingPrices.askp_rsqn3}</div>
                </PriceItem>
                <PriceItem color="blue">
                  {askingPrices.askp2}
                  <div className="volume">{askingPrices.askp_rsqn2}</div>
                </PriceItem>
                <PriceItem color="blue">
                  {askingPrices.askp1}
                  <div className="volume">{askingPrices.askp_rsqn1}</div>
                </PriceItem>
              </>
            ) : (
              <div>Loading...</div>
            )}

            {askingPrices ? (
              <>
                <PriceItem color="red">
                  {askingPrices.bidp1}
                  <div className="volume">{askingPrices.bidp_rsqn1}</div>
                </PriceItem>
                <PriceItem color="red">
                  {askingPrices.bidp2}
                  <div className="volume">{askingPrices.bidp_rsqn2}</div>
                </PriceItem>
                <PriceItem color="red">
                  {askingPrices.bidp3}
                  <div className="volume">{askingPrices.bidp_rsqn3}</div>
                </PriceItem>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </PriceList>
          <TradingBox>
            <PriceDivision>
              <Specified onClick={handleSpecifiedClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    fill="#FDFDFD"
                    stroke="#858585"
                  />
                  {isSpecifiedChecked && (
                    <path
                      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
                      fill="#4AC49E"
                    />
                  )}
                </svg>
                지정
              </Specified>

              <Market onClick={handleMarketClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    fill="#FDFDFD"
                    stroke="#858585"
                  />
                  {isMarketChecked && (
                    <path
                      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
                      fill="#4AC49E"
                    />
                  )}
                </svg>
                시장
              </Market>
            </PriceDivision>
            <PriceAble>
              주문가능
              <Budget>1000</Budget>
            </PriceAble>
            <InputWrapper>
              <InputLabel>수량</InputLabel>
              <InputAmount
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
              />
              <InputSpan>주</InputSpan>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>가격</InputLabel>
              <InputPrice
                placeholder="0"
                value={price}
                onChange={handlePriceChange}
              />
              <InputSpan right="1px">원</InputSpan>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>총액</InputLabel>
              <InputTotal placeholder="0" value={total} />
              <InputSpan right="1px">원</InputSpan>
            </InputWrapper>
            <ButtonContainer>
              <ButtonReset onClick={handleOpenSellModal}>초기화</ButtonReset>
              <ButtonSell onClick={handleOpenSellModal}>매도</ButtonSell>
              {sellModalOpen && (
                <Modal>
                  <ModalContent>
                    <h1>매도하시겠습니까?</h1>
                    <button onClick={handleCloseSellModal}>취소</button>
                    <button
                      onClick={() => {
                        handleSellStock();
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
          className={toggleState === 3 ? 'content active-content' : 'content'}
        >
          <PriceList>
            {askingPrices ? (
              <>
                <PriceItem color="blue">
                  {askingPrices.askp3}
                  <div className="volume">{askingPrices.askp_rsqn3}</div>
                </PriceItem>
                <PriceItem color="blue">
                  {askingPrices.askp2}
                  <div className="volume">{askingPrices.askp_rsqn2}</div>
                </PriceItem>
                <PriceItem color="blue">
                  {askingPrices.askp1}
                  <div className="volume">{askingPrices.askp_rsqn1}</div>
                </PriceItem>
              </>
            ) : (
              <div>Loading...</div>
            )}

            {askingPrices ? (
              <>
                <PriceItem color="red">
                  {askingPrices.bidp1}
                  <div className="volume">{askingPrices.bidp_rsqn1}</div>
                </PriceItem>
                <PriceItem color="red">
                  {askingPrices.bidp2}
                  <div className="volume">{askingPrices.bidp_rsqn2}</div>
                </PriceItem>
                <PriceItem color="red">
                  {askingPrices.bidp3}
                  <div className="volume">{askingPrices.bidp_rsqn3}</div>
                </PriceItem>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </PriceList>
          <TradingBox>
            <PriceDivision>
              <Specified onClick={handleSpecifiedClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    fill="#FDFDFD"
                    stroke="#858585"
                  />
                  {isSpecifiedChecked && (
                    <path
                      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
                      fill="#4AC49E"
                    />
                  )}
                </svg>
                지정
              </Specified>

              <Market onClick={handleMarketClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="8.5"
                    fill="#FDFDFD"
                    stroke="#858585"
                  />
                  {isMarketChecked && (
                    <path
                      d="M16 9C16 12.866 12.866 16 9 16C5.13401 16 2 12.866 2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9Z"
                      fill="#4AC49E"
                    />
                  )}
                </svg>
                시장
              </Market>
            </PriceDivision>
            <PriceAble>
              주문가능
              <Budget>1000</Budget>
            </PriceAble>
            <InputWrapper>
              <InputLabel>수량</InputLabel>
              <InputAmount
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
              />
              <InputSpan>주</InputSpan>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>가격</InputLabel>
              <InputPrice
                placeholder="0"
                value={price}
                onChange={handlePriceChange}
              />
              <InputSpan right="1px">원</InputSpan>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>총액</InputLabel>
              <InputTotal placeholder="0" value={total} />
              <InputSpan right="1px">원</InputSpan>
            </InputWrapper>
            <ButtonContainer>
              <ButtonReset onClick={handleOpenModifyModal}>초기화</ButtonReset>
              <ButtonModify onClick={handleOpenModifyModal}>정정</ButtonModify>
              {modifyModalOpen && (
                <Modal>
                  <ModalContent>
                    <h1>정정하시겠습니까?</h1>
                    <button onClick={handleCloseModifyModal}>취소</button>
                    <button
                      onClick={() => {
                        handleModifyStock();
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
      </div>
    </div>
  );
}

export default TradingTabs;
