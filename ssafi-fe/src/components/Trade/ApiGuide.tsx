import React from 'react';
import styled from 'styled-components';

import tmpImg from '../../assets/images/temp-image.png';

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

const ButtonBox = styled.div`
display: flex;
justify-content: end;
align-items: center;
margin-top: 20px
`;

const GuideBtn = styled.button`
font-size: 20px;
font-weight: 400;
color: var(--white-color);
background-color: var(--dark-color);
width: 80px;
height: 40px;
border: none;
border-radius: 10px;
margin-right: 10px;
cursor: pointer;

&:hover {
  color: var(--dark-color);
  background-color: var(--white-color);
  border: 2px solid var(--dark-color);
}
`;

const GuideImg = styled.img`
width: 900px;
`;

const guideList: Array<string> = ['1. 임시 설명 1', '2. 임시 설명 2', '3. 임시 설명 3', '4. 임시 설명 4', '5. 임시 설명 5', '6. 임시 설명 6', '7. 임시 설명 7', '8. 임시 설명 8'];
const allGuides = guideList.length - 1;

const ApiGuide = ({ closeModal }: GuideProps) => {
  const [guideNum, setGuideNum] = React.useState(0);

  const nextGuideNum = () => {
    if (guideNum < allGuides) {
      setGuideNum(guideNum + 1);
    }
  };

  const previousGuideNum = () => {
    if (guideNum > 0) {
      setGuideNum(guideNum - 1);
    }
  };

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <ModalBackground onClick={closeModal}>
      <ModalContainer onClick={stopPropagation}>
        <div>
          <h3>{guideList[guideNum]}</h3>
          <GuideImg src={tmpImg} />
          {guideNum !== allGuides
            ? <div>
                { guideNum === 0
                  ? <ButtonBox><GuideBtn onClick={nextGuideNum}>다음</GuideBtn></ButtonBox>
                  : <ButtonBox>
                    <GuideBtn onClick={previousGuideNum}>이전</GuideBtn>
                    <GuideBtn onClick={nextGuideNum}>다음</GuideBtn>
                  </ButtonBox>
                }
              </div>
            : <ButtonBox>
                <GuideBtn onClick={previousGuideNum}>이전</GuideBtn>
                <GuideBtn onClick={closeModal}>창 닫기</GuideBtn>
              </ButtonBox>
          }
        </div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ApiGuide;
