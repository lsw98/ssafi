import React from 'react';
import styled from 'styled-components';
import Survey from './components/Survey';
import Result from './components/Result';

const MbtiContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 30px;
`;

export default function Mbti() {
  const [surveyDone, setSurveyDone] = React.useState<boolean>(true);
  return (
    <MbtiContainer>
      {surveyDone
        ? <Result setSurveyDone={setSurveyDone} />
        : <Survey setSurveyDone={setSurveyDone} />
      }
    </MbtiContainer>
  );
}
