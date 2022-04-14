// https://docs.github.com/en/rest/reference/repos#create-or-update-file-contents
// https://docs.github.com/en/rest/reference/gists

export const GetGist = {
  url: 'https://api.github.com/gists/:id',
  method: 'GET',
};

export const CreateGist = {
  url: 'https://api.github.com/gists',
  method: 'POST',
};

export const UpdateGist = {
  url: 'https://api.github.com/gists/:id',
  method: 'PATCH',
};

export const DeleteGist = {
  url: 'https://api.github.com/gists/:id',
  method: 'DELETE',
};

export const GetRepoFiles = {
  url: 'https://api.github.com/repos/:owner/:repo/contents/:path',
  method: 'GET',
};

export const CreateOrUpdateRepoFile = {
  url: 'https://api.github.com/repos/:owner/:repo/contents/:path',
  method: 'PUT',
};

export const DeleteRepoFile = {
  url: 'https://api.github.com/repos/:owner/:repo/contents/:path',
  method: 'DELETE',
};

export const GeteIssues = {
  url: 'https://api.github.com/repos/:owner/:repo/issues',
  method: 'GET',
};

export const CreateIssue = {
  url: 'https://api.github.com/repos/:owner/:repo/issues',
  method: 'POST',
};
