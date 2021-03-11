import { isEmpty, each, clone } from 'lodash';
const axios = window['axios'];

const parseUrl = function (url, method, data) {
  const reg = /\/:(\w+)/gi;
  const routeParams = url.match(reg);
  if (isEmpty(data)) {
    return url;
  }

  if (!isEmpty(routeParams)) {
    each(routeParams, function (routeParam) {
      const keyName = routeParam.replace('/:', '');
      if (data[keyName]) {
        url = url.replace(':' + keyName, data[keyName]);

        if (['GET', 'DELETE'].includes(method)) {
          delete data[keyName]; //将url上匹配的参数删除，以免java由于多余参数产生报错
        }
      }
    });
  }
  return url;
};

const getOptions = (url, method, data,headers) => {
  const options = {
    url,
    method,
    data,
    params: method === 'GET' || method === 'DELETE' ? data : {},
    headers,
  };

  return options;
};

const fetchAPI = (api, params, headers={}) => {
  const data = clone(params);

  const url = parseUrl(api.url, api.method, data);
  const options = getOptions(url, api.method, data, headers);

  return axios(options);
};

export default fetchAPI;
