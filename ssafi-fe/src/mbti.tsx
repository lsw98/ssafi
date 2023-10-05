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
  const [surveyDone, setSurveyDone] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchMbtiPoint = async () => {
      const data = await instance.get('/member/mbti');
      console.log(data);
    };
    fetchMbtiPoint();
  }, []);

  return (
    <MbtiContainer>
      {surveyDone
        ? <Result setSurveyDone={setSurveyDone} />
        : <Survey setSurveyDone={setSurveyDone} />
      }
    </MbtiContainer>
  );
}
