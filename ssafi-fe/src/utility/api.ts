import axios from 'axios';

const apiDomain = process.env.REACT_APP_PROD;
const apiToken = process.env.REACT_APP_PROD_TOKEN;
const apiKey = process.env.REACT_APP_PROD_APPKEY;
const apiSecret = process.env.REACT_APP_PROD_APPSECRET;
const vtsDomain = process.env.REACT_APP_VTS;
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
      authorization: `Bearer ${apiToken}`,
      appkey: apiKey,
      appsecret: apiSecret,
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

export const fetchBuyStock = async (stockCode: string) => {
  const config = {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${vtsToken}`,
      appkey: vtsKey,
      appsecret: vtsSecret,
      tr_id: 'VTTC0802U',
      hashkey: vtsHash,
    },
  };
  const request = {
    body: {
      CANO: '50090047', // 계좌번호 앞 8자리
      ACNT_PRDT_CD: '01', // 계좌번호 뒤 2자리
      PDNO: stockCode, // 종목코드(6자리)
      ORD_DVSN: '00', // 주문구분(00:지정가, 01:시장가)
      ORD_QTY: '1', // 주문수량
      ORD_UNPR: '55000', // 주문단가
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
  } catch (error) {
    console.error('Network Error:', error);
    return [];
  }
};
