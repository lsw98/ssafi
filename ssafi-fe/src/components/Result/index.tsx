import React from 'react';

interface Props {
  setSurveyDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Result({ setSurveyDone }: Props) {
  const handleSurveyDone = () => {
    setSurveyDone(false);
  };

  return (
    <div>
      <h2>Result</h2>
      <button onClick={handleSurveyDone}>다시하기</button>
    </div>
  );
}
