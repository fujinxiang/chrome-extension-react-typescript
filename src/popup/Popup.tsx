import React, { useEffect, useState } from 'react';
import './Popup.less';

export default function Popup() {
  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

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

  const openOptions = () => {
    window.open('/options.html');
  };

  return (
    <div className='popupContainer'>
      <div className='top-icons'>
        <div onClick={copyUrl} className='icon icon-link' />
        <div onClick={copyMarkdown} className='icon icon-markdown' />
        <div onClick={openOptions} className='icon icon-setting' />
      </div>
      {/* <button onClick={sendMessage}>测试发送消息到后台</button> */}
      <canvas id='qrcodeCanvas' width={0} height={0} />
    </div>
  );
}
