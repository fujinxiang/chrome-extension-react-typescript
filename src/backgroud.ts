import favLink from './service/favLink';

// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // onMessage must return "true" if response is async.
  let isResponseAsync = false;

  if (request.message) {
    console.log(request);
  }

  switch (request.message) {
    case 'addFavLink':
      favLink.add(request.url, request.title).then((result) => sendBack(request, sender, result));
      break;
      case 'getAllFavLinks':
        favLink.getAll().then((result) => sendBack(request, sender, result));
        break;
    default:
      break;
  }

  return isResponseAsync;
});

const sendBack = (request, sender, data) => {
  // 兼容从 popup.html 发来的消息，没有 tab
  if (sender.tab) {
    chrome.tabs.sendMessage(sender.tab.id, { asyncId: request.asyncId, data});
  } else {
    chrome.runtime.sendMessage({ asyncId: request.asyncId, data });
  }
};

/**如果想自定义点击按钮的响应，需要去掉 manifest.json 中 browser_action 的 default_popup*/
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: chrome.extension.getURL('popup.html') });
});
