class Gitee {
  constructor() {}

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
}

const gitee = new Gitee();
export default gitee;
