import React, { useEffect } from 'react';
import './Popup.less';

export default function Popup() {
  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true });

    chrome.tabs.query({ active: true }, function (tabs) {
      const url = tabs[0].url;
      //@ts-ignore
      QRCode.toCanvas(document.getElementById('qrcodeCanvas'), url, { width: 200, height: 200 }, function (error) {
        if (error) console.error(error);
        console.log('success!');
      });
    });
  }, []);

  const sendMessage = () => {
    chrome.runtime.sendMessage({ messageId: '123', data: Date.now() });
  };

  return (
    <div className='popupContainer'>
      <button onClick={sendMessage}>测试发送消息到后台</button>
      <canvas id='qrcodeCanvas' />
    </div>
  );
}
