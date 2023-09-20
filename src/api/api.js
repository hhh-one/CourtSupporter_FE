import axios from 'axios'

import * as utils from 'utils';
import * as hooks from 'hooks';

export const instance = axios.create({
  baseURL: utils.API_BASE_URL,
  timeout: 5000
})

instance.interceptors.request.use(
  function (config) {
    const accessToken = hooks.getCookie(utils.HEADER.AUTHORIZATION);
    config.headers[utils.HEADER.AUTHORIZATION] = accessToken;
    config.headers['Access-Control-Allow-Private-Network'] = true;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
)

export const apis = {
  get_users: () => instance.get(`/users`),
  insert_users: params => instance.post(`/users/joinForm`, params),
  login: loginInfo => instance.post(`/users/login`, loginInfo),
  check_id: userId => instance.post(`/users/checkId`, userId),
  send_email: params => instance.post(`/users/mail`, params),
  find_users: findData => instance.post(`/users/findUsers`, findData),
  update_pw: inputData => instance.post(`/users/updatePw`, inputData),
};