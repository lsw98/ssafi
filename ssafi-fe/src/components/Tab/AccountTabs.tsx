import { useState } from 'react';
import styled from 'styled-components';
import './AccountTabs.css';
// 뉴스 검색바 영역 (이후 확장성을 위해 만들어둠)

function AccountTabs() {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index: number) => {
    setToggleState(index);
  };

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
          잔고
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
