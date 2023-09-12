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
      }
    };

    fetchData();
  }, [dispatch, code, navigate]);

  return <div>{/* JSX 내용 추가 */}</div>;
};

export default Kakao;
