import React, { useEffect, useRef, useState } from 'react';
import CryptoJS from 'crypto-js';

interface WebSocketTestProps {}

const WebSocketTest: React.FC<WebSocketTestProps> = () => {
  const [aes256DecodeData, setAes256DecodeData] = useState<string>('');
  const [logBuffer, setLogBuffer] = useState<string[]>([]);
  const [log1Buffer, setLog1Buffer] = useState<string[]>([]);

  // 상태를 추가하세요.
  const [encryptkey, setEncryptkey] = useState<string>('');
  const [iv, setIv] = useState<string>('');

  const handleLog = (s: string, f: number) => {
    console.log(s);
    if (f === 1) {
      // 다루려는 HTML 요소를 관리하세요.
    } else if (f === 2) {
      // 다루려는 다른 HTML 요소를 관리하세요.
    }
  };

  const handleLog1 = (a: string, s: string) => {
    console.log(s);
    if (a === '02') {
      // 빨간색 로그 핸들링.
    } else if (a === '01') {
      // 파란색 로그 핸들링.
    }
  };

  const aes256Decode = (
    secretKey: string,
    Iv: string,
    data: string,
  ): string => {
    const cipher = CryptoJS.AES.decrypt(
      data,
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: CryptoJS.enc.Utf8.parse(Iv),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      },
    );

    const decodedData = cipher.toString(CryptoJS.enc.Utf8);
    setAes256DecodeData(decodedData);
    return decodedData;
  };

  const filterUnicode = (quoted: string): string => {
    const escapable =
      /[\x00-\x1f\ud800-\udfff\u200c\u2028-\u202f\u2060-\u206f\ufff0-\uffff]/g;
    return quoted.replace(escapable, '');
  };

  // 이벤트 핸들러나 다른 함수를 여기에 추가하십시오.

  return (
    <div>
      <button onClick={/* 해당 버튼의 이벤트 핸들러를 여기에 연결하세요. */}>
        주식호가 등록
      </button>
      {/* 출력과 관련된 로그를 보여주는 컴포넌트를 여기에 추가하세요. */}
    </div>
  );
};

export default WebSocketTest;
