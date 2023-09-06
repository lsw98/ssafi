import React from 'react';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Survey from './components/Survey';
// eslint-disable-next-line import/no-unresolved, import/extensions
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
