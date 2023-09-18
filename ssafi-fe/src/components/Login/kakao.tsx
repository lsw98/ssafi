/* eslint-disable import/no-unresolved, import/extensions */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { actionCreators as userActions } from '../../redux/modules/user';

const Kakao = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 인가코드
  const codeParam = new URL(window.location.href).searchParams.get('code');
  const code = codeParam || '';

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        await dispatch(userActions.kakaoLogin(code, navigate) as any);
      } else {
        // code가 없는 경우 처리
        console.log('code가 없음');
        window.alert('로그인에 실패하였습니다.');
        navigate('/');
      }
    };

    fetchData();
  }, [dispatch, code, navigate]);

  return <div>...로그인중입니다</div>;
};

export default Kakao;
