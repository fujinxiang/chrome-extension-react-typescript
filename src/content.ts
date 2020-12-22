console.log('content script');

const sendMessage = () => {
  chrome.runtime.sendMessage({ messageId: '123', data: Date.now() });
};
