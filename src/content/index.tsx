import React from 'react';
import ReactDOM from 'react-dom';
import { message } from 'livod-ui';
import './style.less';
console.log('content script');

const sendMessage = () => {
  chrome.runtime.sendMessage({ messageId: '123', data: Date.now() });
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

const MarkButton = ()=>{

  const mark = ()=>{
    const url = window.location.href;
    message.success(`${url} marked`);
  }

  return <button onClick={mark}>标记页面</button>
}

const container = document.createElement('div');
container.classList.add('content-create-container');
document.body.appendChild(container);

ReactDOM.render(<MarkButton />, container);
