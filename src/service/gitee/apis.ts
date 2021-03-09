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
