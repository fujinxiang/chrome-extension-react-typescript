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
