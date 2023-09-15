import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface SemiCircleProps {
  color: string;
  percent: number;
}

const DonutContainer = styled.div`
  height: 170px;
  margin: 20px;
  overflow: hidden;
`;

const Donut = styled.div<{halfPercent : number, barColor : string}>`
  width: calc(100% - 16px);
  padding-bottom: calc(100% - 16px);
  margin: 0 auto;
  border-radius: 50%;
  position: relative;
  text-align: center;
  transition: background .3s ease-in-out;
  background: conic-gradient(
    from -90deg,
    var(--${(props) => props.barColor}-color) 0% ${(props) => props.halfPercent}%,
    var(--light-gray-color) ${(props) => props.halfPercent}% 50%,
    transparent 50% 100%
  );

  &:before {
    color: var(--black-color);
    width: 70%;
    background: var(--background-color);
    border-radius: 50%;
    position: absolute;
    left: 15%;
    top: 14%;
    content: attr(data-percent)'%';
    transform: skew(-0.03deg);
    font-weight: 800;
    font-size: 36px;
    padding: 20% 0 35% 0;
  }
`;

const StockCategoryName = styled.div`
  position: absolute;
  top: 54px;
  width: 100%;
  text-align: center;
  color: var(--black-color);
  font-weight: 400;
  font-size: 26px;
`;

const SemiCircleProgress = ({ color, percent }: SemiCircleProps) => {
  const [increasePercent, setIncreasePercent] = useState(0);
  const [stockCategory, setStockCategory] = useState('');

  useEffect(() => {
    let tmpPercent = 0;
    const donutAnimation = setInterval(() => {
      if (tmpPercent >= percent) {
        clearInterval(donutAnimation);
      } else {
        tmpPercent += 1;
        setIncreasePercent(tmpPercent);
      }
    }, 10);
  }, [percent]);

  useEffect(() => {
    if (color === 'safe') {
      setStockCategory('안전형');
    } else if (color === 'middle') {
      setStockCategory('중립형');
    } else {
      setStockCategory('위험형');
    }
  }, [color]);

  return (
    <DonutContainer>
      <Donut
        data-percent={increasePercent}
        barColor = {color}
        halfPercent ={increasePercent / 2}
      >
        <StockCategoryName>{stockCategory}</StockCategoryName>
      </Donut>
    </DonutContainer>
  );
};

export default SemiCircleProgress;
