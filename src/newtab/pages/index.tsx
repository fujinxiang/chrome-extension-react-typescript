import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'livod-ui';
import { CronJob } from 'cron';
const { TabPane } = Tabs;
import github from '../../service/github';
import FavList from './favList';
import './style.less';

console.log('cronJob', CronJob);
// var job = new CronJob('* * * * * *', function() {
//   console.log('You will see this message every second');
// }, null, true, 'Asia/Shanghai');
// job.start();

const content = localStorage.getItem('notice');

const Index = () => {
  const [keyword, setKeyword] = useState('');
  const [notice, setNotice] = useState(content);

  useEffect(() => {
    readLocal();

    chrome.bookmarks.getTree((result) => {
      console.log('bookmarks see docs https://developer.chrome.com/docs/extensions/reference/bookmarks/', result);
    });
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

    // gitee.updateGist('xp3oj2esabn7qhr096dfv30', '这是修改后的内容', 'test.txt', 'simpleDesc').then((result) => {
    //   console.log(result);
    // });

    github.createRepoFile(JSON.stringify({ temp: 'json' }), 'temp2.json', 'add temp').then((result) => {
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
      <Tabs defaultActiveKey='1'>
        <TabPane tab='搜索' key='1'>
          <div>
            <input type='text' className='searchInput' value={keyword} placeholder='输入搜索关键字' onChange={keywordChanged} />
          </div>

          <div className='search-buttons'>
            <Button style={{ background: '#0084FF', color: '#fff' }} onClick={zhihuSearch}>
              知乎专栏
            </Button>
            <Button style={{ background: '#24292E', color: '#fff' }} onClick={githubSearch}>
              Github
            </Button>
            <Button style={{ background: '#FF4201', color: '#fff' }} onClick={iconFontSearch}>
              iconfont
            </Button>
            <Button style={{ background: '#fb7299', color: '#fff' }} onClick={bilibiliSearch}>
              BiliBili
            </Button>
            <Button style={{ background: '#1b7299', color: '#fff' }} onClick={test}>
              测试
            </Button>

          </div>
        </TabPane>
        <TabPane tab='收藏' key='2'>
          <FavList />
        </TabPane>
        <TabPane tab='笔记' key='3'>
          <div id='notes-container'>
            <textarea value={notice} onChange={onTextChange} onBlur={noticeBlur} onKeyPress={noticeKeyPress} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Index;
