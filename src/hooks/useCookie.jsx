import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const getCookie = token => {
  if (cookies.get(token)) {
    return cookies.get(token);
  }
  return null;
};

const deleteCookie = token => {
  const date = new Date('2020-01-01').toUTCString();
  document.cookie = token + '=; expires=' + date + '; path=/';
  window.location.reload();
};

export { getCookie, deleteCookie };
