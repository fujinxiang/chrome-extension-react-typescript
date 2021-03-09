import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import gitee from '../../service/gitee';
import './style.less';

const content = localStorage.getItem('notice');

const Index = () => {
  const [keyword, setKeyword] = useState('');
  const [notice, setNotice] = useState(content);

  useEffect(() => {
    readLocal();
  }, []);

  const keywordChanged = (e) => {
    setKeyword(e.target.value);
  };

  const zhihuSearch = () => {
    window.open(`https://www.baidu.com/s?wd=${encodeURIComponent(`site:zhuanlan.zhihu.com ${keyword}`)}`);
  };

  const githubSearch = () => {
    window.open(`https://github.com/search?q=${encodeURIComponent(`${keyword}`)}`);
  };

  const iconFontSearch = () => {
    window.open(`https://www.iconfont.cn/search/index?searchType=icon&q=${encodeURIComponent(`${keyword}`)}`);
  };

  const bilibiliSearch = () => {
    window.open(`https://search.bilibili.com/all?keyword=${encodeURIComponent(`${keyword}`)}`);
  };

  const test = () => {
    // gitee.createGist('这是一段内容', 'test.txt', 'simpleDesc').then(result=>{
    //   console.log(result);
    // });

    // gitee.getGistList().then((result) => {
    //   console.log(result);
    // });

    gitee.updateGist('xp3oj2esabn7qhr096dfv30', '这是修改后的内容', 'test.txt', 'simpleDesc').then((result) => {
      console.log(result);
    });
    
  };

  const sendMessage = () => {
    chrome.runtime.sendMessage({ messageId: 'newtab', data: Date.now() });
  };

  const readLocal = () => {
    const content = localStorage.getItem('notice');
    setNotice(content);
  };

  const noticeBlur = (e) => {
    const value = e.target.value;
    localStorage.setItem('notice', value);
  };

  const noticeKeyPress = (e) => {
    if (e.key === 'Enter') {
      const value = e.target.value;
      localStorage.setItem('notice', value);
    }
  };

  const onTextChange = (e) => {
    const value = e.target.value;
    setNotice(value);
  };

  return (
    <div id='newtab-container'>
      <div>
        <input type='text' className='searchInput' value={keyword} placeholder='输入搜索关键字' onChange={keywordChanged} />
      </div>

      <div className='search-buttons'>
        <Button style={{ background: '#0084FF' }} onClick={zhihuSearch}>
          知乎专栏
        </Button>
        <Button style={{ background: '#24292E' }} onClick={githubSearch}>
          Github
        </Button>
        <Button style={{ background: '#FF4201' }} onClick={iconFontSearch}>
          iconfont
        </Button>
        <Button style={{ background: '#fb7299' }} onClick={bilibiliSearch}>
          BiliBili
        </Button>
        <Button style={{ background: '#1b7299' }} onClick={test}>
          测试
        </Button>
      </div>

      {/* <button onClick={sendMessage}>测试发送消息到后台</button> */}

      <div id='notes-container'>
        <textarea value={notice} onChange={onTextChange} onBlur={noticeBlur} onKeyPress={noticeKeyPress} />
      </div>
    </div>
  );
};

export default Index;
