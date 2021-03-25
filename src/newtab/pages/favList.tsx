import { Button, message } from 'livod-ui';
import React, { useEffect, useState } from 'react';
import { unionBy } from 'lodash';
import favLink from '../../service/favLink';
import gitee from '../../service/gitee';
import { atou } from 'COMMON/helpers/utils';

const Index = () => {
  const [favLinks, setFavLinks] = useState([]);

  useEffect(() => {
    favLink.getAll().then((result) => {
      const sortedLinks = result.sort((a, b) => a.createTime - b.createTime);
      setFavLinks(sortedLinks);
    });

    chrome.bookmarks.getTree((result) => {
      console.log('bookmarks see docs https://developer.chrome.com/docs/extensions/reference/bookmarks/', result);
    });
  }, []);

  const SyncFileLinks = () => {
    gitee.getRepoFiles('favLinks.json').then((result: any) => {
      const sha = result.data.sha;
      const remoteLinks = JSON.parse(atou(result.data.content));
      const links = unionBy(remoteLinks, favLinks, 'key');

      // 注意，此处会将已删除的项也保留下来
      // 同时还需要将远程获取的内容写入本地
      // 如果只做单向同步会简单很多
      gitee.updateRepoFile(JSON.stringify(links), sha, 'favLinks.json', 'update favlinks').then((result) => {
        console.log(result);
      });
    });
  };

  const deleteFavLink = (link) => {
    favLink.delete(link.key).then(() => {
      setFavLinks((prev) => prev.filter((x) => x.key !== link.key));
      message.success('删除成功');
    });
  };

  return (
    <div>
      <Button style={{ background: '#6b7299', color: '#fff', border: 'none' }} onClick={SyncFileLinks}>
        同步链接
      </Button>
      {favLinks.map((x) => (
        <div key={x.key} className='fav-link-item'>
          <a href={x.url} target='_blank'>
            {x.title}
          </a>
          <a className='link-text danger mx-10' onClick={() => deleteFavLink(x)}>
            删除
          </a>
        </div>
      ))}
    </div>
  );
};

export default Index;
