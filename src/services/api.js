import { prepareParams } from '@/helpers/helpers';

const token = localStorage.getItem('user-token');

const headers = {
  Accept: 'application/json',
  Authentication: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

const baseUrl = process.env.VUE_APP_API_BASEURL;

// eslint-disable-next-line consistent-return
const sendRequest = async (route, params, config) => {
  try {
    const response = await fetch(`${baseUrl}${route}${prepareParams(params)}`, config);
    const json = response.json();
    if (response?.ok) {
      return json.then((res) => res);
    }
    return json.then((err) => { throw err; });
  } catch (e) {
    throw Error(e);
  }
};

export default {
  get(route = '', params = {}) {
    return sendRequest(route, params, { method: 'GET', headers });
  },
  post(route = '', data = [], params = {}) {
    return sendRequest(route, params, { method: 'POST', headers, body: JSON.stringify(data) });
  },
  delete(route = '', params = {}) {
    return sendRequest(route, params, { method: 'DELETE', headers });
  },
  update(route = '', data = [], params = {}) {
    return sendRequest(route, params, { method: 'PUT', headers, body: JSON.stringify(data) });
  },
};
