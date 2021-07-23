import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { message } from 'livod-ui';
import { getRandomId } from '../common/helpers/utils';
import './style.less';

console.log('content script');

const asyncIdResolveMap = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (asyncIdResolveMap[request.asyncId]) {
    const resolve = asyncIdResolveMap[request.asyncId];
    resolve(request);
    delete asyncIdResolveMap[request.asyncId];
  }
});

const callAPI = (message, params?: any): Promise<any> => {
  const asyncId = getRandomId();
  return new Promise((resolve, _reject) => {
    asyncIdResolveMap[asyncId] = resolve;

    chrome.runtime.sendMessage({ message, asyncId, ...params });
  });
};

(function () {
  function script() {
    //@ts-ignore
    window.testName = 'fujinxiang';
  }

  function inject(fn) {
    const script = document.createElement('script');
    script.text = `(${fn.toString()})();`;
    document.documentElement.appendChild(script);
  }

  inject(script);
})();

const MarkButton = () => {
  const [marked, setMarked] = useState(false);
  const mark = () => {
    const url = window.location.href;
    const title = window.document.title;

    callAPI('addFavLink', { url, title }).then((result) => {
      message.success(`${url} marked`);
      setMarked(true);
      console.log(result);
    });
  };

  useEffect(() => {
    callAPI('getAllFavLinks').then((result) => {
      const data = result.data;
      const marked = data.some((x) => x.url === window.location.href);
      setMarked(marked);
      console.log(result);
    });
  });

  if (marked) return <div>已标记</div>;

  return <button onClick={mark}>标记页面</button>;
};

const container = document.createElement('div');
container.classList.add('content-create-container');
document.body.appendChild(container);

const unMarkList = ['seewo.com', 'gz.cvte.cn', 'cvte.com'];

const unMark = unMarkList.some((x) => window.location.href.includes(x));

if (!unMark) {
  ReactDOM.render(<MarkButton />, container);
}