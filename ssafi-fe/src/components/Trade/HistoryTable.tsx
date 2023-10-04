import React from 'react';
import styled from 'styled-components';

interface StyleProps {
  index?: number;
  color?: boolean;
  width?: string;
}

const TableContainer = styled.div`
  margin-top: 20px;
  width: 660px;
`;

const Table = styled.div`
  border-collapse: collapse;
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: flex;
  background: var(--gradation-color);
  border-radius: 12px;
`;

const TableRow = styled.div<StyleProps>`
  display: flex;
  background-color: ${(props) => (props.index === 0 ? 'transparent' : 'var(--light-gray-color)')};
`;

// 테이블 데이터 셀 요소에 스타일 적용
const TableCell = styled.div<StyleProps>`
  width: ${({ width }) => width || '98px'};
  padding: 14px 0;
  white-space: nowrap;
  text-align: center;
  font-weight: 300;
  &.header {
    font-weight: 500;
  }
  &.color {
    color: ${(props) => (props.color ? 'var(--upper-color)' : 'var(--lower-color)')};
  }
`;

const TableBody = styled.div`
  max-height: 406px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export default function HistoryTable() {
  const HistioryDate = [
    {
      tradeTime: '2023/09/13',
      tradeSubject: 'SK하이닉스아아',
      tradeQuantity: 6,
      purchasePrice: 51900,
      sellingPrice: 52200,
      tradeProfit: -1163,
      tradeRate: -0.37,
    },
    {
      tradeTime: '2023/09/12',
      tradeSubject: '카카오',
      tradeQuantity: 3,
      purchasePrice: 42500,
      sellingPrice: 43900,
      tradeProfit: 2971,
      tradeRate: 2.33,
    },
    {
      tradeTime: '2023/09/12',
      tradeSubject: '카카오',
      tradeQuantity: 3,
      purchasePrice: 42500,
      sellingPrice: 43900,
      tradeProfit: 2971,
      tradeRate: 2.33,
    },
    {
      tradeTime: '2023/09/13',
      tradeSubject: '삼성전자',
      tradeQuantity: 6,
      purchasePrice: 51900,
      sellingPrice: 52200,
      tradeProfit: -1163,
      tradeRate: -0.37,
    },
    {
      tradeTime: '2023/09/12',
      tradeSubject: '카카오',
      tradeQuantity: 3,
      purchasePrice: 42500,
      sellingPrice: 43900,
      tradeProfit: 2971,
      tradeRate: 2.33,
    },
    {
      tradeTime: '2023/09/12',
      tradeSubject: '카카오',
      tradeQuantity: 3,
      purchasePrice: 42500,
      sellingPrice: 43900,
      tradeProfit: 2971,
      tradeRate: 2.33,
    },
    {
      tradeTime: '2023/09/13',
      tradeSubject: '삼성전자',
      tradeQuantity: 6,
      purchasePrice: 51900,
      sellingPrice: 52200,
      tradeProfit: -1163,
      tradeRate: -0.37,
    },
    {
      tradeTime: '2023/09/12',
      tradeSubject: '카카오',
      tradeQuantity: 3,
      purchasePrice: 42500,
      sellingPrice: 43900,
      tradeProfit: 2971,
      tradeRate: 2.33,
    },
    {
      tradeTime: '2023/09/13',
      tradeSubject: '삼성전자',
      tradeQuantity: 6,
      purchasePrice: 51900,
      sellingPrice: 52200,
      tradeProfit: -1163,
      tradeRate: -0.37,
    },
    {
      tradeTime: '2023/09/12',
      tradeSubject: '카카오',
      tradeQuantity: 3,
      purchasePrice: 42500,
      sellingPrice: 43900,
      tradeProfit: 2971,
      tradeRate: 2.33,
    },
    {
      tradeTime: '2023/09/13',
      tradeSubject: '삼성전자',
      tradeQuantity: 6,
      purchasePrice: 51900,
      sellingPrice: 52200,
      tradeProfit: -1163,
      tradeRate: -0.37,
    },
  ];
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableCell className='header' width='124px'>거래일자</TableCell>
          <TableCell className='header' width='112px'>종목명</TableCell>
          <TableCell className='header' width='48px'>수량</TableCell>
          <TableCell className='header'>매입가</TableCell>
          <TableCell className='header'>매도체결가</TableCell>
          <TableCell className='header' width='180px'>실현손익 (수익률)</TableCell>
        </TableHeader>
        <TableBody>
          {HistioryDate.map((item, idx) => (
            <TableRow key={idx} index={idx % 2}>
              <TableCell width='124px'>{item.tradeTime}</TableCell>
              <TableCell width='112px'>{item.tradeSubject}</TableCell>
              <TableCell width='48px'>{item.tradeQuantity}</TableCell>
              <TableCell>{item.purchasePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</TableCell>
              <TableCell>{item.sellingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원</TableCell>
              <TableCell width='180px' className='color' color={item.tradeProfit > 0}>
                {item.tradeProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원 ( {item.tradeRate}% )
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
