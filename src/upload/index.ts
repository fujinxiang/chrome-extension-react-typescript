import getFileMd5 from 'COMMON/helpers/md5';
import github from 'Service/github';
import LocalCache from 'Service/localCache';

const info = document.getElementById('info');

const dragzone = window['dragzone'];

const cdnImage = LocalCache.getCache('images');

dragzone('container', (file) => {
  const formdata = new FormData();
  formdata.append('file', file);

  getFileMd5(file).then((result) => {
    addInfo(result);
  });

  addInfo(`正在上传 ${file.name}`);
  upload(file).then((result: any) => {
    const path = result.data.content.path;
    const cdnUrl = `https://cdn.jsdelivr.net/gh/fujinxiang/statics/${path}`;
    cdnImage.add(cdnUrl);
    addInfo(cdnUrl);
  });
});

function addInfo(text) {
  const appendInfo = document.createElement('input');
  appendInfo.type = 'text';
  appendInfo.value = text;
  info.append(appendInfo);
}

function upload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {

      //@ts-ignore
      const content = e.target.result.replace(/data.*base64,/g, '');
      const path = `${Date.now()}-${file.name}`;
      const message = 'add file';
      github.createRepoFile(content, path, message).then(resolve).catch(reject);
    };
  });
}
