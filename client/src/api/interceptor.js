import axios from 'axios';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: CONSTANTS.BASE_URL,
});

let accessToken = null;

httpClient.interceptors.request.use(
  config => {

    if (accessToken) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
    }
    return config;
  },
  err => Promise.reject(err)
);

httpClient.interceptors.response.use(
  response => {
    if (response.data.tokenPair) {
      const {
        accessToken: newAccessToken,
        refreshToken
      } = response.data.tokenPair;


      window.localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refreshToken);
      accessToken = newAccessToken;
    }
    return response;
  },
  async err => {
    console.log('interceptor started')
    const oldRefreshToken = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    if (err.response.status === 419 && oldRefreshToken) {

      const {
        data: {
          tokenPair: {
            accessToken: newAccessToken,
            refreshToken
          }
        }
      } = await axios.post(`${CONSTANTS.BASE_URL}auth/refresh`, { refreshToken: oldRefreshToken });

      

      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refreshToken);
      accessToken = newAccessToken;

      err.config.headers['Authorization'] = `Bearer ${accessToken}`;

      return axios.request(err.config);
    }

    return Promise.reject(err);
  }
);

export default httpClient;
