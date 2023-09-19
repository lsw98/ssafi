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

const ButtonBox = styled.div`
display: flex;
justify-content: end;
align-items: center;
`;

const guideList: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7'];
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
        api key 받아오는 방법 설명
        <div>
          <h3>{guideList[guideNum]}</h3>
          {guideNum !== allGuides
            ? <div>
                { guideNum === 0
                  ? <ButtonBox><button onClick={nextGuideNum}>다음</button></ButtonBox>
                  : <ButtonBox>
                    <button onClick={previousGuideNum}>이전</button>
                    <button onClick={nextGuideNum}>다음</button>
                  </ButtonBox>
                }
              </div>
            : <ButtonBox><button onClick={closeModal}>창 닫기</button></ButtonBox>
          }
        </div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ApiGuide;
