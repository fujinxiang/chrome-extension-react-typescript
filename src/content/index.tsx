import React from 'react';
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

const callAPI = (message, params): Promise<any> => {
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
  const mark = () => {
    const url = window.location.href;
    const title = window.document.title;

    callAPI('addFavLink', { url,title }).then((result) => {
      message.success(`${url} marked`);
      console.log(result);
    });
  };

  return <button onClick={mark}>标记页面</button>;
};

const container = document.createElement('div');
container.classList.add('content-create-container');
document.body.appendChild(container);

ReactDOM.render(<MarkButton />, container);
