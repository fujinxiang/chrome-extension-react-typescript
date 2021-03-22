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

  const path = `${Date.now()}-${file.name}`;
  addInfo(`正在上传 ${path}`);
  const cdnUrl = `https://cdn.jsdelivr.net/gh/fujinxiang/statics/${path}`;
  cdnImage.add(cdnUrl);
  addInfo(cdnUrl);
  addInfo(`![](${cdnUrl})`);

  upload(file, path).then((result: any) => {
    addInfo(`上传 ${path} 成功`);
  });
});

function addInfo(text) {
  const appendInfo = document.createElement('input');
  appendInfo.type = 'text';
  appendInfo.value = text;
  info.append(appendInfo);
}

function upload(file, path) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {

      //@ts-ignore
      const content = e.target.result.replace(/data.*base64,/g, '');
      const message = 'add file';
      github.createRepoFile(content, path, message).then(resolve).catch(reject);
    };
  });
}
