import React, { useEffect, useState } from 'react';
import { Button } from 'livod-ui';
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
      const title = tabs[0].title.replace(' - 视睿软件设计中心 - CVTE 知识库', '');
      copyToClipboard(`[${title}](${url})`);
    });
  };

  const openOptions = () => {
    window.open('/options.html');
  };

  return (
    <div className='popupContainer'>
      <div className='top-icons'>
        <Button onClick={copyMarkdown}>Markdown</Button>
        <Button onClick={() => window.open('/upload.html')}>上传</Button>
        <Button onClick={openOptions}>设置</Button>
      </div>
    </div>
  );
}
