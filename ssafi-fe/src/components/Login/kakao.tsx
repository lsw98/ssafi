/* eslint-disable import/no-unresolved, import/extensions */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../../redux/modules/user';

interface KakaoProps {}

const Kakao: React.FC<KakaoProps> = (props) => {
  const dispatch = useDispatch();

  // 인가코드
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(userActions.kakaoLogin(code));
    };

    fetchData();
  }, [dispatch, code]);

  return <div>{/* JSX 내용 추가 */}</div>;
};

export default Kakao;
