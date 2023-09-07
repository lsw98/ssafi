import React from 'react';

interface Props {
  setSurveyDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Questions({ setSurveyDone }: Props) {
  const questionList: Array<string> = ['0', '1', '2', '3', '4', '5', '6', '7'];
  const allQuestions = questionList.length;
  const [questionNum, setQuestionNum] = React.useState(0);

  const handleQuestionNum = () => {
    // eslint-disable-next-line no-plusplus
    setQuestionNum(questionNum + 1);
  };

  const handleSurveyDone = () => {
    setSurveyDone(true);
  };

  return (
    <div>
      {questionNum < allQuestions
        ? <div>
            <h3>{questionList[questionNum]}</h3>
            <button onClick={handleQuestionNum}>다음</button>
          </div>
        : <button onClick={handleSurveyDone}>결과 보기</button>
      }
    </div>
  );
}
