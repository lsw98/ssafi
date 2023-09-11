// import React from 'react';

const restApiKey = 'faca27bfefc2d177abb474fbdec73704'; // REST API KEY
const redirectUri = 'http://localhost:3000/auth'; // Redirect URI

// oauth 요청 URL
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUri}&response_type=code`;
// const code = new URL(window.location.href).searchParams.get('code');
export default kakaoURL;
