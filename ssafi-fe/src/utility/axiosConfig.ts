import axios from 'axios';

export const privateApi = axios.create({
  baseURL: 'https://8264-211-192-210-179.ngrok-free.app/api/',
  headers: {
    Authorization: localStorage.getItem('accessToken'),
  },
});

export async function postRefreshToken() {
  const response = await privateApi.post('/api/auth/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  return response;
}

privateApi.interceptors.response.use(
  // 200번대 응답이 올때 처리
  (response) => {
    return response;
  },
  // 200번대 응답이 아닐 경우 처리
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      const originalRequest = config;
      try {
        const response = await postRefreshToken();
        if (response.status === 200) {
          const newAccessToken = response.headers.authorization;
          const newRefreshToken = response.headers.refreshtoken;
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          privateApi.defaults.headers.Authorization = newAccessToken;
          originalRequest.headers.Authorization = newAccessToken;
          return privateApi(originalRequest);
        }
      } catch (error) {
        console.error('Refresh token failed', error);
        localStorage.clear();
        window.location.replace('/');
      }
    }
    return Promise.reject(error);
  },
);