// https://gitee.com/api/v5/swagger  Gitee API 接口文档

export const CreateToken = {
  url: 'https://gitee.com/oauth/token',
  method: 'POST',
};

export const CreateGist = {
  url: 'https://gitee.com/api/v5/gists',
  method: 'POST',
};

export const UpdateGist = {
  url: 'https://gitee.com/api/v5/gists/:id',
  method: 'PATCH',
};

export const GetGist = {
  url: 'https://gitee.com/api/v5/gists',
  method: 'GET',
};

export const DeleteGist = {
  url: 'https://gitee.com/api/v5/gists/:id',
  method: 'DELETE',
};

export const GetRepoFiles = {
  url: 'https://gitee.com/api/v5/repos/:owner/:repo/contents/:path',
  method: 'GET',
};

export const CreateRepoFile = {
  url: 'https://gitee.com/api/v5/repos/:owner/:repo/contents/:path',
  method: 'POST',
};

export const UpdateRepoFile = {
  url: 'https://gitee.com/api/v5/repos/:owner/:repo/contents/:path',
  method: 'PUT',
};

export const DeleteRepoFile = {
  url: 'https://gitee.com/api/v5/repos/:owner/:repo/contents/:path',
  method: 'DELETE',
};

export const GeteIssues = {
  url: 'https://gitee.com/api/v5/repos/:owner/:repo/issues',
  method: 'GET',
};

export const CreateIssue = {
  url: 'https://gitee.com/api/v5/repos/:owner/issues',
  method: 'POST',
};
