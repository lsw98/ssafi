import React from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';
import InvestGraph from './InvestGraph';
import mbtiTraitsJson from '../../assets/mbti-traits.json';
import tempImg from '../../assets/images/temp-image.png';

interface Props {
  setSurveyDone: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TypeProp {
  type: string;
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

export default function Result({ setSurveyDone }: Props) {
  const tempUser = '김싸피';
  const tempPoint = [8, 16, 6, 10];
  const mbtiProps: MbtiPoint[] = [
    {
      element: [
        'Active\nA(외향형)',
        'Inactive\nI(내향형)',
      ],
      percentage: tempPoint[0] * 5,
    },
    {
      element: [
        'Professional\nP(전문가형)',
        'Beginner\nB(탐험가형)',
      ],
      percentage: tempPoint[1] * 5,
    },
    {
      element: [
        'Most Effective\nE(집중형)',
        'Well Balanced\nW(분산형)',
      ],
      percentage: tempPoint[2] * 5,
    },
    {
      element: [
        'Liberal\nL(자유형)',
        'Conservative\nC(신중형)',
      ],
      percentage: tempPoint[3] * 5,
    },
  ];

  const tempDoughnut: number[] = [33, 33];

  const mbtiIndex = [
    'APML', 'APMC', 'APWL', 'APWC', 'ABML', 'ABMC', 'ABWC', 'ABWL',
    'IPML', 'IPMC', 'IPWL', 'IPWC', 'IBML', 'IBMC', 'IBWL', 'IBWC',
  ];

  const mbtiTraits = mbtiTraitsJson.data;
  const [mbtiType, setMbtiType] = React.useState<string>();
  const [mbtiTrait, setMbtiTrait] = React.useState<MbtiTrait | null>(null);
  const [mbtiHashtag, setMbtiHashtag] = React.useState<string[]>(['']);

  React.useEffect(() => {
    const getMbtiType = () => {
      let mbtiString = '';
      mbtiProps.forEach((mbtiProp) => {
        if (mbtiProp.percentage < 50) {
          mbtiString += mbtiProp.element[1].slice(0, 1);
        } else {
          mbtiString += mbtiProp.element[0].slice(0, 1);
        }
      });
      setMbtiType(mbtiString);
      setMbtiTrait(mbtiTraits[mbtiIndex.indexOf(mbtiString)]);
      setMbtiHashtag(mbtiTraits[mbtiIndex.indexOf(mbtiString)].hashtag);
    };
    getMbtiType();
  });

  const handleSurveyDone = () => {
    setSurveyDone(false);
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <ResultContainer>
      <ResultTitle>{tempUser}님의 금융 MBTI 성향 결과</ResultTitle>
      <ResultBox>
        <MbtiTypeBox>{mbtiType}</MbtiTypeBox>
        <MbtiSummary></MbtiSummary>
        <BarContainer>
          {mbtiProps.map((mbtiProp: MbtiPoint, index: number) => (
            <div key={index}>
              <ProgressBar mbtiPoint={mbtiProp} />
            </div>
          ))}
        </BarContainer>
      </ResultBox>
      <ResultBox>
        <TraitTitle><PointMbti>{mbtiType}</PointMbti> 투자 스타일 특징?</TraitTitle>
        <HashtagContainer>
          {mbtiHashtag && mbtiHashtag.map((tag: string, index: number) => (
          <div key={index}>
            <TraitHashtag>{tag}</TraitHashtag>
          </div>
          ))}
        </HashtagContainer>
        <TraitDescription>{mbtiTrait && mbtiTrait.description}</TraitDescription>
      </ResultBox>
      <ResultBox>
        <TraitTitle><PointMbti>{mbtiType}</PointMbti>을 위한 추천</TraitTitle>
        <RecommendBox>
          <GraphBox>
            <InvestGraph ratio={tempDoughnut} />
            <RatioBox>
              <RecomRatio>
                <RatioColor type='danger' />
                위험형: {tempDoughnut[0]}%
              </RecomRatio>
              <RecomRatio>
                <RatioColor type='middle' />
                중립형: {tempDoughnut[1]}%
              </RecomRatio>
              <RecomRatio>
                <RatioColor type='safe' />
                안정형: {100 - tempDoughnut[0] - tempDoughnut[1]}%
              </RecomRatio>
            </RatioBox>
          </GraphBox>
          <RecomStock>
            <RecomComment>{'어쩌구 저쩌구한 AAAA!\n어쩌구 한 주식에 한 번 더 걸어보세요!'}</RecomComment>
            <StockInfo>
              <StockName>{'추천종목'}</StockName>
              <StockLogo src={tempImg} />
            </StockInfo>
          </RecomStock>
        </RecommendBox>
      </ResultBox>
      <ResultBox>
        <TraitTitle><PointMbti>{mbtiType}</PointMbti> 유형의 유명인</TraitTitle>
        <PersonSummary>{mbtiTrait && mbtiTrait.person.summary}</PersonSummary>
        <PersonName>{mbtiTrait && mbtiTrait.person.name}</PersonName>
        <TraitDescription>{mbtiTrait && mbtiTrait.person.description}</TraitDescription>
      </ResultBox>
      <RedoBtn onClick={handleSurveyDone}>다시하기</RedoBtn>
    </ResultContainer>
  );
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
margin-bottom: 20px;
`;

const ResultBox = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 1000px;
padding: 50px 0px;
margin: 30px 0px;
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
margin-bottom: 10px;
`;

const PointMbti = styled.span`
color: var(--point-color);
`;

const HashtagContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 300px;
`;

const TraitHashtag = styled.p`
font-size: 24px;
font-weight: 400;
color: var(--gray-color);
`;

const TraitDescription = styled.div`
text-align: center;
white-space: pre-line;
font-size: 24px;
`;

const RecommendBox = styled.div`
display: flex;
justify-content: space-between;
margin-top: 30px;
width: 760px;
`;

const GraphBox = styled.div`
width: 350px;
display: flex;
justify-content: space-between;
align-items: center;
`;

const RatioBox = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: start;

height: 120px;
margin-left: 20px;
`;

const RecomRatio = styled.div`
display: flex;
align-items: center;
font-size: 24px;
font-weight: 600;
color: var(--black-color);
`;

const RatioColor = styled.div<TypeProp>`
width: 15px;
height: 15px;
border-radius: 50px;
background-color: ${(props) => {
    if (props.type === 'danger') return 'var(--danger-color)';
    if (props.type === 'middle') return 'var(--middle-color)';
    if (props.type === 'safe') return 'var(--safe-color)';
    return null;
  }};
margin-right: 10px;
`;

const RecomStock = styled.div`
width: 350px;
display: flex;
flex-direction: column;
align-items: center;
`;

const RecomComment = styled.p`
font-size: 20px;
font-weight: 400;
color: var(--black-color);
white-space: pre-line;
text-align: center;
`;

const StockInfo = styled.div`
display: flex;
justify-content: space-between;
align-items: start;
width: 300px;
`;

const StockName = styled.div`
widht: 120px;
font-size: 24px;
font-weight: 600;
color: var(--black-color);
`;

const StockLogo = styled.img`
width: 180px;
`;

const PersonSummary = styled.p`
font-size: 24px;
font-weight: 400;
color: #00583D;
margin-bottom: 0px;
`;

const PersonName = styled.p`
font-size: 30px;
font-weight: 700;
color: var(--black-color);
margin-top: 10px;
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
