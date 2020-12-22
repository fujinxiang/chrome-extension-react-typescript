import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './style.less';

const Index = () => {
  const [keyword, setKeyword] = useState('');

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

  
  const sendMessage = () => {
    chrome.runtime.sendMessage({ messageId: 'newtab', data: Date.now() });
  };

  return (
    <div id='newtab-container'>
      <div>
        <input type='text' className='searchInput' value={keyword} placeholder='输入搜索关键字' onChange={keywordChanged} />
      </div>

      <div className='search-buttons'>
        <Button variant='primary' onClick={zhihuSearch}>
          知乎专栏
        </Button>
        <Button variant='primary' onClick={githubSearch}>
          Github
        </Button>
        <Button variant='primary' onClick={iconFontSearch}>
          iconfont
        </Button>
      </div>

      {/* <button onClick={sendMessage}>测试发送消息到后台</button> */}
    </div>
  );
};

export default Index;
