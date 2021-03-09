// https://gitee.com/api/v5/swagger

class Gitee {
  private token: string;
  constructor() {
    // this.getToken().then(result=>{
    //   this.token = result.token;
    // })
  }

  getToken() {
    const tokenUrl = 'https://gitee.com/oauth/token';

    const username = localStorage.getItem('gitee-account');
    const password = localStorage.getItem('gitee-password');
    const client_id = localStorage.getItem('gitee-clientId');
    const client_secret = localStorage.getItem('gitee-clientSecret');

    const options = {
      url: tokenUrl,
      method: 'POST',
      data: {
        grant_type: 'password',
        username,
        password,
        client_id,
        client_secret,
        scope: 'user_info projects pull_requests issues notes keys hook groups gists enterprises',
      },
    };
    const axios = window['axios'];
    return axios(options);
  }

  createGist(content, filename, description) {
    const tokenUrl = 'https://gitee.com/api/v5/gists';

    const access_token = '7cbc13dc601c013b8735c04a01e55475';

    const files = { [filename]: { "content": content } }
    // const files = { [filename]: { "content": content }, "file1.md": { "content": "## 测试" } }  // 支持多个文件

    const options = {
      url: tokenUrl,
      method: 'POST',
      data: {
        access_token,
        files,
        description
      },
    };
    const axios = window['axios'];
    return axios(options);
  }
}

const gitee = new Gitee();
export default gitee;
