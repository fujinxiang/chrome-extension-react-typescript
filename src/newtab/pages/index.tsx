import React, { useState } from 'react';

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

  return (
    <div>
      <input type='text' value={keyword} onChange={keywordChanged} />
      <button onClick={zhihuSearch}>知乎专栏</button>
      <button onClick={githubSearch}>Github</button>
    </div>
  );
};

export default Index;
