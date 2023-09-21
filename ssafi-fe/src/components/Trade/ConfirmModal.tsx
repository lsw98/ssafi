import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ConfirmModal = () => (
  <ModalBackground>
    모달 띄웠다
  </ModalBackground>
);

export default ConfirmModal;
