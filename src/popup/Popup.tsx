import React, { useEffect, useState } from 'react';
import './Popup.less';

export default function Popup() {
  // const [showQrcode, setShowQrcode] = useState(false);
  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  const sendMessage = () => {
    chrome.runtime.sendMessage({ messageId: '123', data: Date.now() });
  };

  const showQrcode = () => {
    chrome.tabs.query({ active: true }, function (tabs) {
      const url = tabs[0].url;
      //@ts-ignore
      QRCode.toCanvas(document.getElementById('qrcodeCanvas'), url, { width: 200, height: 200 }, function (error) {
        if (error) console.error(error);
        console.log('success!');
      });
    });
  };

  const copyToClipboard = (text) => {
    // @ts-ignore
    const item = new ClipboardItem({ 'text/plain': new Blob([text], { type: 'text/plain' }) });
    // @ts-ignore
    navigator.clipboard.write([item]);
  };

  const copyUrl = () => {
    chrome.tabs.query({ active: true }, function (tabs) {
      const url = tabs[0].url;
      copyToClipboard(url);
    });
  };

  const copyMarkdown = () => {
    chrome.tabs.query({ active: true }, function (tabs) {
      const url = tabs[0].url;
      const title = tabs[0].title;
      copyToClipboard(`[${title}](${url})`);
    });
  };

  return (
    <div className='popupContainer'>
      <div onClick={copyUrl} className='icon icon-link' />
      <div onClick={copyMarkdown} className='icon icon-markdown' />
      <div onClick={showQrcode} className='icon icon-qrcode' />
      <button onClick={sendMessage}>设置</button>
      <button onClick={sendMessage}>测试发送消息到后台</button>
      <canvas id='qrcodeCanvas' />
    </div>
  );
}
