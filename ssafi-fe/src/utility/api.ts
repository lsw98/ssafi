import axios from 'axios';

const apiDomain = process.env.REACT_APP_PROD;
const apiToken = process.env.REACT_APP_PROD_TOKEN;
const apiKey = process.env.REACT_APP_PROD_APPKEY;
const apiSecret = process.env.REACT_APP_PROD_APPSECRET;

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
export async function fetchStockCodes() {
  const response = await fetch('/src/assets/kospi200.txt');
  const text = await response.text();
  const lines = text.trim().split('\n'); // 빈 줄 제거 후 줄 단위로 나눔
  return lines.map((line) => line.split(',')[0].padStart(6, '0')); // 쉼표로 나눈 후 첫 번째 항목(종목코드)만 추출하고, 앞에 '0'을 붙여 6자리로 만듦
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

// 메인 로직
// async function main() {
//   const stockCodes = await fetchStockCodes();
//   console.log('Fetched stock codes:', stockCodes);
//   for (const code of stockCodes) {
//     const stockPriceData = await fetchStockPrice(code);
//     console.log(`Stock Code: ${code}, Price Data: `, stockPriceData);
//   }
// }

// main().catch((error) => console.error(error));
