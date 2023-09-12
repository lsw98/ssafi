import React from 'react';
import styled from 'styled-components';

interface GuideProps {
  closeModal: () => void;
}

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

const ModalContainer = styled.div`
  background-color: var(--white-color);
  padding: 20px 20px 40px;
  border-radius: 20px;
  transition: height 0.3s;
`;

const ApiGuide = ({ closeModal }: GuideProps) => (
  <ModalBackground onClick={closeModal}>
    <ModalContainer>
      api key 받아오는 방법 설명
    </ModalContainer>
  </ModalBackground>
);

export default ApiGuide;
