// https://gitee.com/api/v5/swagger
import fetchAPI from 'COMMON/helpers/fetchAPI';
import { message } from 'livod-ui';
import * as Apis from './apis';
class Gitee {
  private token: string;
  constructor() {
    // token 不能为空，否则不会被发送过去，会引起 500 错误
    this.token = localStorage.getItem('gitee-token') || 'xxx';
  }

  private async createToken() {
    const username = localStorage.getItem('gitee-account');
    const password = localStorage.getItem('gitee-password');
    const client_id = localStorage.getItem('gitee-clientId');
    const client_secret = localStorage.getItem('gitee-clientSecret');

    const params = {
      grant_type: 'password',
      username,
      password,
      client_id,
      client_secret,
      scope: 'user_info projects pull_requests issues notes keys hook groups gists enterprises',
    };

    try {
      const tokenResult = await fetchAPI(Apis.CreateToken, params);
      const access_token = tokenResult.data.access_token;
      this.token = access_token;
      localStorage.setItem('gitee-token', access_token);
      return access_token;
    } catch (error) {
      message.error(error.message);
    }

    return fetchAPI(Apis.CreateToken, params);
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

  getGistList() {
    const params = {
      since: '20200309',
      page: 1,
      per_page: 20,
    };

    return this.AuthCall(Apis.GetGist, params);
  }

  private AuthCall(api, params) {
    const access_token = this.token;
    return new Promise((resolve, reject) => {
      fetchAPI(api, { ...params, access_token })
        .then(resolve)
        .catch(async (error) => {
          if (error.response.status === 401) {
            const access_token = await this.createToken();
            fetchAPI(api, { ...params, access_token })
              .then(resolve)
              .catch(reject);
          }
        });
    });
  }
}

const gitee = new Gitee();
export default gitee;
