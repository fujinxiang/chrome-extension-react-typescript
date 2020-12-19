import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';

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

      <Alert variant='success'>
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>
          Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an
          alert works with this kind of content.
        </p>
        <hr />
        <p className='mb-0'>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
      </Alert>
    </div>
  );
};

export default Index;
