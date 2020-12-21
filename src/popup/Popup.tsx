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

  return (
    <div className='popupContainer'>
      <button onClick={sendMessage}>测试发送消息到后台</button>
      <button onClick={sendMessage}>url</button>
      <button onClick={sendMessage}>markdown</button>
      <div onClick={showQrcode} className='icon icon-markdown' />
      <div onClick={showQrcode} className='icon icon-qrcode' />
      <button onClick={sendMessage}>设置</button>
      <canvas id='qrcodeCanvas' />
    </div>
  );
}
