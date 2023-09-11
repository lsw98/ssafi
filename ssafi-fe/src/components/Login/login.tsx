import React from 'react';

const SocialKakao: React.FC = () => {
  const restApiKey = 'faca27bfefc2d177abb474fbdec73704'; // REST API KEY
  const redirectUri = 'http://localhost:3000/auth'; // Redirect URI

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
  const code = new URL(window.location.href).searchParams.get('code');

  const handleLogin = () => {
    window.location.href = kakaoURL;
    // console.log(code);
  };

  return (
    <>
      <button onClick={handleLogin}>카카오 로그인</button>
    </>
  );
};

export default SocialKakao;
