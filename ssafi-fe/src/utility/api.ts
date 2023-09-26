import axios from 'axios';

const apiDomain = process.env.REACT_APP_PROD;
const apiCano = process.env.REACT_APP_CANO_REAL;
const apiToken = process.env.REACT_APP_PROD_TOKEN;
const apiKey = process.env.REACT_APP_PROD_APPKEY;
const apiSecret = process.env.REACT_APP_PROD_APPSECRET;

const vtsDomain = process.env.REACT_APP_VTS;
const vtsCano = process.env.REACT_APP_CANO;
const vtsToken = process.env.REACT_APP_VTS_TOKEN;
const vtsKey = process.env.REACT_APP_VTS_APPKEY;
const vtsSecret = process.env.REACT_APP_VTS_APPSECRET;
const vtsHash = process.env.REACT_APP_VTS_HASH;

function getCurrentTime() {
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 0-based index
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0'); // 24-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month}.${day} ${hours}:${minutes}`;
}

export const fetchTradeVolumeRanking = async (callback: any) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${apiToken}`,
      appkey: apiKey,
      appsecret: apiSecret,
      tr_id: 'FHPST01710000',
    },
    params: {
      FID_COND_MRKT_DIV_CODE: 'J',
      FID_COND_SCR_DIV_CODE: '20171',
      FID_INPUT_ISCD: '0002',
      FID_DIV_CLS_CODE: '0',
      FID_BLNG_CLS_CODE: '0',
      FID_TRGT_CLS_CODE: '111111111',
      FID_TRGT_EXLS_CLS_CODE: '000000',
      FID_INPUT_PRICE_1: '0',
      FID_INPUT_PRICE_2: '0',
      FID_VOL_CNT: '0',
      FID_INPUT_DATE_1: '0',
    },
  };

  try {
    const currentTime = getCurrentTime();
    const response = await axios.get(
      '/uapi/domestic-stock/v1/quotations/volume-rank',
      config,
    );
    // console.log(response);

    if (response.data.rt_cd === '0') {
      callback(currentTime); // 현재 시간을 callback 함수에 전달
      return response.data.output;
    } else {
      console.error('API Error:', response.data.msg1);
      callback(null); // 오류가 발생하면 null을 callback 함수에 전달
      return [];
    }
  } catch (error) {
    console.error('Network Error:', error);
    callback(null); // 오류가 발생하면 null을 callback 함수에 전달
    return [];
  }
};

// 종목코드를 가져오는 함수
export async function fetchStockInfo() {
  const response = await fetch('/kospi200.txt');
  const text = await response.text();
  const lines = text.trim().split('\n'); // 빈 줄 제거 후 줄 단위로 나눔
  return lines.map((line) => {
    const [code, name] = line.split(','); // 쉼표로 나눈 후 첫 번째 항목은 종목코드, 두 번째 항목은 종목명
    return {
      stockCode: code.padStart(6, '0'), // 종목코드 앞에 '0'을 붙여 6자리로 만듦
      stockName: name,
    };
  });
}

export const fetchStockPrice = async (stockCode: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'FHKST01010100',
    },
    params: {
      fid_cond_mrkt_div_code: 'J',
      fid_input_iscd: stockCode,
    },
  };

  try {
    const response = await axios.get(
      '/uapi/domestic-stock/v1/quotations/inquire-price',
      config,
    );
    console.log(response);

    if (response.data.rt_cd === '0') {
      const output = response.data.output;
      // 필요한 두 개의 속성만 반환
      return {
        stck_prpr: output.stck_prpr,
        prdy_vrss_sign: output.prdy_vrss_sign,
      };
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error) {
    console.error('Network Error:', error);
    return [];
  }
};

export const fetchBuyStock = async (
  stockCode: string,
  division: string,
  amount: string,
  price: string,
) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'VTTC0802U',
      // hashkey: vtsHash,
    },
  };
  const request = {
    body: {
      CANO: '50090047', // 계좌번호 앞 8자리
      ACNT_PRDT_CD: '01', // 계좌번호 뒤 2자리
      PDNO: stockCode, // 종목코드(6자리)
      ORD_DVSN: division, // 주문구분(00:지정가, 01:시장가)
      ORD_QTY: amount, // 주문수량
      ORD_UNPR: price, // 주문단가
    },
  };
  try {
    const response = await axios.post(
      '/uapi/domestic-stock/v1/trading/order-cash',
      request,
      config,
    );
    console.log(response);

    if (response.data.rt_cd === '0') {
      return response.data.output;
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error: any) {
    console.error('Network Error:', error);
    console.error('Server Response:', error.response); // 서버 응답 로깅
    return [];
  }
};

export const fetchSellStock = async (
  stockCode: string,
  division: string,
  amount: string,
  price: string,
) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'VTTC0801U',
      // hashkey: vtsHash,
    },
  };
  const request = {
    body: {
      CANO: '50090047', // 계좌번호 앞 8자리
      ACNT_PRDT_CD: '01', // 계좌번호 뒤 2자리
      PDNO: stockCode, // 종목코드(6자리)
      ORD_DVSN: division, // 주문구분(00:지정가, 01:시장가)
      ORD_QTY: amount, // 주문수량
      ORD_UNPR: price, // 주문단가
    },
  };
  try {
    const response = await axios.post(
      '/uapi/domestic-stock/v1/trading/order-cash',
      request,
      config,
    );
    console.log(response);

    if (response.data.rt_cd === '0') {
      return response.data.output;
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error: any) {
    console.error('Network Error:', error);
    console.error('Server Response:', error.response); // 서버 응답 로깅
    return [];
  }
};

export const fetchModifyStock = async (
  stockCode: string,
  division: string,
  amount: string,
  price: string,
) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'VTTC0803U',
      // hashkey: vtsHash,
    },
  };
  const request = {
    body: {
      CANO: '50090047', // 계좌번호 앞 8자리
      ACNT_PRDT_CD: '01', // 계좌번호 뒤 2자리
      KRX_FWDG_ORD_ORGNO: '00950', // 주문시 한국투자증권 시스템에서 지정된 영업점코드
      ORGN_ODNO: '6635', // 주식일별주문체결조회 API output1의 odno(주문번호) 값 입력
      ORD_DVSN: '00', // 주문구분(00:지정가, 01:시장가)
      RVSE_CNCL_DVSN_CD: '02', // 정정취소구분(01:정정, 02:취소)
      ORD_QTY: '1', // 주문수량 [잔량전부 취소] "0" 설정
      ORD_UNPR: '55000', // 주문단가 [취소] "0" 설정
      QTY_ALL_ORD_YN: 'Y', // [정정/취소] Y : 잔량전부 N : 잔량일부
    },
  };
  try {
    const response = await axios.post(
      '/uapi/domestic-stock/v1/trading/order-rvsecncl',
      request,
      config,
    );
    console.log(response);

    if (response.data.rt_cd === '0') {
      return response.data.output;
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error: any) {
    console.error('Network Error:', error);
    console.error('Server Response:', error.response); // 서버 응답 로깅
    return [];
  }
};

export const fetchCheckAccount = async () => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'VTTC8434R',
    },
    params: {
      CANO: vtsCano,
      ACNT_PRDT_CD: '01', // 계좌번호 뒤 2자리
      AFHR_FLPR_YN: 'N', // 기본값(or 시간외단일가) -> N만 사용
      OFL_YN: '', // 공란 Default
      INQR_DVSN: '01', // 조회구분(01: 대출일별, 02: 종목별)
      UNPR_DVSN: '01', // 단기구분(01: 기본값)
      FUND_STTL_ICLD_YN: 'N', // Default
      FNCG_AMT_AUTO_RDPT_YN: 'N', // Default
      PRCS_DVSN: '01', // 전일매매(00: 포함, 01: 미포함)
      CTX_AREA_FK100: '', // 공란
      CTX_AREA_NK100: '', // 공란
    },
  };

  try {
    const response = await axios.get(
      '/uapi/domestic-stock/v1/quotations/inquire-balance',
      config,
    );
    console.log(response);

    if (response.data.rt_cd === '0') {
      const refinedOutput = response.data.output1.map((item: any) => {
        return {
          pdno: item.pdno, // 종목코드
          prdt_name: item.prdt_name, // 종목명
          hldg_qty: item.hldg_qty, // 보유수량
          pchs_avg_pric: item.pchs_avg_pric, // 매입평균가
          prpr: item.prpr, // 현재가
          evlu_amt: item.evlu_amt, // 평가금액
          evlu_pfls_amt: item.evlu_pfls_amt, // 손익금액
          evlu_pfls_rt: item.evlu_pfls_rt, // 손익률
        };
      });

      return refinedOutput;
    } else {
      console.error('API Error:', response.data.msg1);
      return [];
    }
  } catch (error) {
    console.error('Network Error:', error);
    return [];
  }
};
