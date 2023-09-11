/* eslint-disable import/no-unresolved, import/extensions */
import axios from 'axios';
// import { history } from '../configureStore';
import { push } from 'connected-react-router';

// 액션 타입 정의 (필요한 경우 추가)
const KAKAO_LOGIN = 'user/KAKAO_LOGIN';

// 액션 생성자 정의 (필요한 경우 추가)
export const kakaoLogin = (code) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/auth?code=${code}`,
      );
      const ACCESS_TOKEN = response.data.accessToken;
      localStorage.setItem('token', ACCESS_TOKEN);
      dispatch(push('/main')); // 라우팅을 변경합니다.
    } catch (error) {
      console.error('소셜 로그인 에러', error);
      window.alert('로그인에 실패하였습니다.');
      dispatch(push('/login')); // 라우팅을 변경합니다.
    }
  };
};

// 초기 상태 및 리듀서 정의
const initialState = {
  // 초기 상태 값 정의
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case KAKAO_LOGIN:
      // KAKAO_LOGIN 액션 처리 코드 추가
      return state;
    default:
      return state;
  }
}
