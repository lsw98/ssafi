import React from 'react';

import styled from 'styled-components';
import Survey from './components/Survey';
import Result from './components/Result';

import instance from './api/apiControlller';

const MbtiContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 0px 30px;
`;

export default function Mbti() {
  const [surveyDone, setSurveyDone] = React.useState<boolean>(false);
  const [mbtiScore, setMbtiScore] = React.useState<number[]>([]);

  React.useEffect(() => {
    const fetchMbtiPoint = async () => {
      const mbtiData = await instance.get('/portfolio');
      const mbtiScores = mbtiData.data;
      if (mbtiScores.aiScore !== null) {
        setMbtiScore([mbtiScores.aiScore, mbtiScores.pbScore, mbtiScores.mwScore, mbtiScores.lcScore]);
        setSurveyDone(true);
      }
    };
    fetchMbtiPoint();
  }, []);

  return (
    <MbtiContainer>
      {surveyDone
        ? <Result setSurveyDone={setSurveyDone} mbtiScore={mbtiScore}/>
        : <Survey setSurveyDone={setSurveyDone} />
      }
    </MbtiContainer>
  );
}
