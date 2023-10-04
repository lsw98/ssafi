import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './AccountTabs.css';
import { fetchCheckAccount } from '../../utility/api';

interface StyleProps {
  index?: number;
  color?: boolean;
  width?: string;
}

const TableContainer = styled.div`
  margin-top: 5px;
  width: 100%;
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
  font-size: 15px;
`;

const TableRow = styled.div<StyleProps>`
  display: flex;
  background-color: ${(props) =>
    props.index === 0 ? 'transparent' : 'var(--light-gray-color)'};
  font-size: 10px;
`;

// 테이블 데이터 셀 요소에 스타일 적용
const TableCell = styled.div<StyleProps>`
  width: ${({ width }) => width || '70px'};
  padding: 5px 0;
  white-space: nowrap;
  text-align: center;
  font-weight: 400;
  &.header {
    font-weight: 500;
  }
  &.color {
    color: ${(props) =>
      props.color ? 'var(--upper-color)' : 'var(--lower-color)'};
  }
`;

const TableBody = styled.div`
  max-height: 406px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

function AccountTabs() {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index: number) => {
    setToggleState(index);
  };
  const [historyDate, setHistoryDate] = useState([
    {
      stockName: '',
      amount: '',
      purchasePrice: '',
      nowPrice: '',
      totalPrice: '',
      profitRate: '',
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchCheckAccount();
        console.log('Fetched Data:', fetchedData); // 데이터 로그 출력

        const updatedHistory = fetchedData.map((item: any) => ({
          stockName: item.prdt_name,
          amount: item.hldg_qty,
          purchasePrice: item.pchs_avg_pric,
          nowPrice: item.prpr,
          totalPrice: item.evlu_amt,
          profitRate: item.evlu_pfls_rt,
        }));

        setHistoryDate((prev) => [...prev, ...updatedHistory]);
      } catch (error) {
        console.error('Fetching Error:', error);
      }
    };
    fetchData();
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className="account-container">
      <div className="bloc-tabs">
        <div
          className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(1)}
        >
          잔고
        </div>
        <div
          className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
          onClick={() => toggleTab(2)}
        >
          미체결
        </div>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? 'content active-content' : 'content'}
        >
          <TableContainer>
            <Table>
              <TableHeader>
                <TableCell className="header" width="70px">
                  종목명
                </TableCell>
                <TableCell className="header" width="60px">
                  보유수량
                </TableCell>
                <TableCell className="header">매입평균가</TableCell>
                <TableCell className="header">현재가</TableCell>
                <TableCell className="header" width="80px">
                  손익금액 (수익률)
                </TableCell>
              </TableHeader>
              <TableBody>
                {historyDate.map((item: any, idx: number) => (
                  <TableRow key={idx} index={idx % 2}>
                    <TableCell width="70px">{item.stockName}</TableCell>
                    <TableCell width="60px">{item.amount}</TableCell>
                    <TableCell>
                      {item.purchasePrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      원
                    </TableCell>
                    <TableCell>
                      {item.nowPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      원
                    </TableCell>
                    <TableCell
                      width="80px"
                      className="color"
                      color={item.totalPrice > 0}
                    >
                      {item.totalPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                      원 ( {item.profitRate}% )
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div
          className={toggleState === 2 ? 'content active-content' : 'content'}
        >
          미체결
        </div>
      </div>
    </div>
  );
}

export default AccountTabs;
