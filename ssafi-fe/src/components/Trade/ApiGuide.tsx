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

const questionList: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7'];
const allQuestions = questionList.length - 1;

const ApiGuide = ({ closeModal }: GuideProps) => {
  const [questionNum, setQuestionNum] = React.useState(0);

  const nextQuestionNum = () => {
    if (questionNum < allQuestions) {
      setQuestionNum(questionNum + 1);
    }
  };

  const previousQuestionNum = () => {
    if (questionNum > 0) {
      setQuestionNum(questionNum - 1);
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
          <h3>{questionList[questionNum]}</h3>
          {questionNum !== allQuestions
            ? <div>
                { questionNum === 0
                  ? <ButtonBox><button onClick={nextQuestionNum}>다음</button></ButtonBox>
                  : <ButtonBox>
                    <button onClick={previousQuestionNum}>이전</button>
                    <button onClick={nextQuestionNum}>다음</button>
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
