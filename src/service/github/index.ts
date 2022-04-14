import fetchAPI from 'COMMON/helpers/fetchAPI';
import * as Apis from './apis';

const owner = 'fujinxiang';
const repo = 'statics';

class Github {
  private token: string;
  constructor() {
    // token 不能为空，否则不会被发送过去，会引起 500 错误
    this.token = localStorage.getItem('github-token');
    if (!this.token) {
      console.error('github token is missing');
    }
  }

  createGist(content, filename, description) {
    const files = { [filename]: { content: content } };
    // const files = { [filename]: { "content": content }, "file1.md": { "content": "## 测试" } }  // 支持多个文件

    const params = {
      files,
      description,
    };

    return this.AuthCall(Apis.CreateGist, params);
  }

  updateGist(id, content, filename, description = '') {
    const files = { [filename]: { content } };

    const params = {
      id,
      files,
      description,
    };

    return this.AuthCall(Apis.UpdateGist, params);
  }

  getGistList() {
    const params = {
      since: '20200309',
      page: 1,
      per_page: 20,
    };

    return this.AuthCall(Apis.GetGist, params);
  }

  deleteGist(id) {
    return this.AuthCall(Apis.DeleteGist, { id });
  }

  getRepoFiles(path) {
    const data = {
      owner,
      repo,
      path,
    };

    return this.AuthCall(Apis.GetRepoFiles, data);
  }

  createRepoFile(content, path, message) {
    const data = {
      owner,
      repo,
      content,
      path,
      message,
    };
    return this.AuthCall(Apis.CreateOrUpdateRepoFile, data);
  }

  updateRepoFile(content, sha, path, message) {
    const data = {
      owner,
      repo,
      content,
      sha,
      path,
      message,
    };
    return this.AuthCall(Apis.CreateOrUpdateRepoFile, data);
  }

  deleteRepoFile(sha, path, message) {
    const data = {
      owner,
      repo,
      path,
      sha,
      message,
    };
    return this.AuthCall(Apis.DeleteRepoFile, data);
  }

  private AuthCall(api, params) {
    const headers = {
      accept: 'application/vnd.github.v3+json',
      Authorization: `token ${this.token}`,
    };
    return new Promise((resolve, reject) => {
      fetchAPI(api, { ...params }, headers)
        .then(resolve)
        .catch(reject);
    });
  }
}

const github = new Github();
export default github;
