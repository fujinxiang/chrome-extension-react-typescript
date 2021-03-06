// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  let isResponseAsync = false;

  if (request.popupMounted) {
    console.log('eventPage notified that Popup.tsx has mounted.');
  }

  if (request.messageId) {
    console.log(request);
  }

  return isResponseAsync;
});

/**如果想自定义点击按钮的响应，需要去掉 manifest.json 中 browser_action 的 default_popup*/
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: chrome.extension.getURL('popup.html') });
});
