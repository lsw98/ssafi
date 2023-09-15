import React from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';
import mbtiTypesJson from '../../assets/mbti-types.json';

interface Props {
  setSurveyDone: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MbtiType {
  [key: string]: {
    summary: string;
    hashtag: string[];
    description: string;
    person: {
      summary: string;
      name: string;
      description: string;
    };
  };
}

interface MbtiTrait {
  summary: string;
  hashtag: string[];
  description: string;
  person: {
    summary: string;
    name: string;
    description: string;
  };
}

interface MbtiPoint {
  element: Array<string>;
  percentage: number;
}

const ResultContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width:1210px;
margin-bottom: 100px;
`;

const ResultTitle = styled.p`
font-size: 36px;
font-weight: 600;
color: var(--black-color);
margin-top: 80px;
margin-bottom: 0px;
`;

const ResultBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 1000px;
padding: 50px 0px;
margin: 50px 0px;
background-color: var(--white-color);
`;

const MbtiTypeBox = styled.div`
display :flex;
justify-content: center;
align-items: center;

width: 200px;
height: 60px;
background-color: var(--point-color);
border-radius: 20px;

font-size: 32px;
font-weight: 600;
color: var(--white-color);
`;

const MbtiSummary = styled.p`
font-size: 40px;
font-weight: 600;
color: var(--black-color);
`;

const BarContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
height: 300px;
`;

const TraitTitle = styled.p`
font-size: 38px;
font-weight: 600;
color: var(--black-color);
`;

const PointMbti = styled.span`
color: var(--point-color);
`;

const TraitHashtag = styled.p`
font-size: 24px;
font-weight: 400;
color: var(--gray-color);
`;

const RedoBtn = styled.button`
font-size: 28px;
font-weight: 400;
color: var(--white-color);
background-color: var(--dark-color);
width: 150px;
height: 50px;
border: none;
border-radius: 10px;
margin-top: 50px;
cursor: pointer;

&:hover {
  color: var(--dark-color);
  background-color: var(--white-color);
  border: 2px solid var(--dark-color);
}
`;

export default function Result({ setSurveyDone }: Props) {
  const tempUser = '김싸피';
  const tempMbti: MbtiPoint[] = [
    {
      element: [
        'Active\nA(외향형)',
        'Inactive\nI(내향형)',
      ],
      percentage: 40,
    },
    {
      element: [
        'Professional\nP(전문가형)',
        'Beginner\nB(탐험가형)',
      ],
      percentage: 10,
    },
    {
      element: [
        'Most Effective\nE(집중형)',
        'Well Balanced\nW(분산형)',
      ],
      percentage: 80,
    },
    {
      element: [
        'Liberal\nL(자유형)',
        'Conservative\nC(신중형)',
      ],
      percentage: 50,
    },
  ];
  const mbtiTypes: MbtiType = mbtiTypesJson;
  const [mbtiType, setMbtiType] = React.useState<string>();
  const [mbtiTrait, setMbtiTrait] = React.useState<MbtiTrait | null>(null);
  const [mbtiHashtag, setMbtiHashtag] = React.useState<string[]>(['']);

  React.useEffect(() => {
    const getMbtiType = () => {
      let mbtiString = '';
      tempMbti.forEach((mbtiPoint) => {
        if (mbtiPoint.percentage < 50) {
          mbtiString += mbtiPoint.element[1].slice(0, 1);
        } else {
          mbtiString += mbtiPoint.element[0].slice(0, 1);
        }
      });
      setMbtiType(mbtiString);
      setMbtiTrait(mbtiTypes[mbtiString]);
      setMbtiHashtag(mbtiTypes[mbtiString].hashtag);
    };
    getMbtiType();
  });

  const handleSurveyDone = () => {
    setSurveyDone(false);
  };

  return (
    <ResultContainer>
      <ResultTitle>{tempUser}님의 금융 MBTI 성향 결과</ResultTitle>
      <ResultBox>
        <MbtiTypeBox>{mbtiType}</MbtiTypeBox>
        <MbtiSummary></MbtiSummary>
        <BarContainer>
          {tempMbti.map((mbtiPoint: MbtiPoint, index: number) => (
            <div key={index}>
              <ProgressBar mbtiPoint={mbtiPoint} />
            </div>
          ))}
        </BarContainer>
      </ResultBox>
      <ResultBox>
        <TraitTitle><PointMbti>{mbtiType}</PointMbti> 투자 스타일 특징?</TraitTitle>
        {mbtiType && mbtiTypes[mbtiType].hashtag.map((tag: string, index: number) => (
        <div key={index}>
          <TraitHashtag>{tag}</TraitHashtag>
        </div>
        ))}
      </ResultBox>
      <RedoBtn onClick={handleSurveyDone}>다시하기</RedoBtn>
    </ResultContainer>
  );
}
