import { prepareParams } from '@/helpers/helpers';

const token = localStorage.getItem('user-token');

const headers = {
  Accept: 'application/json',
  Authentication: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

const baseUrl = process.env.VUE_APP_API_BASEURL;

export default {
  get(route = '', params = {}) {
    return fetch(`${baseUrl}${route}${prepareParams(params)}`, { method: 'GET', headers })
      .then((response) => response.json())
      .then((json) => json);
  },
  post(route = '', data = [], params = {}) {
    return fetch(`${baseUrl}${route}${prepareParams(params)}`, { method: 'POST', headers, body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((json) => json);
  },
  delete(route = '', params = {}) {
    return fetch(`${baseUrl}${route}${prepareParams(params)}`, { method: 'DELETE', headers })
      .then((response) => response.json())
      .then((json) => json);
  },
  update(route = '', data = [], params = {}) {
    return fetch(`${baseUrl}${route}${prepareParams(params)}`, { method: 'PUT', headers, body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((json) => json);
  },
};
