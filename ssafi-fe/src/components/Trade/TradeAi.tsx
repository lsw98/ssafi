import React from 'react';
import styled from 'styled-components';
import handleScroll from '../../utils/scrollUtils';

export default function TradeAi() {
  React.useEffect(() => {
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <>
    </>
  );
}
