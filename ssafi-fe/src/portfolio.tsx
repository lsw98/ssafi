import React from 'react';
import Survey from './components/Survey';
import Result from './components/Result';

export default function Portfolio() {
  const [surveyDone, setSurveyDone] = React.useState<boolean>(false);
  return (
    <div>
      {surveyDone
        ? <Result setSurveyDone={setSurveyDone} />
        : <Survey setSurveyDone={setSurveyDone} />
      }
    </div>
  );
}
