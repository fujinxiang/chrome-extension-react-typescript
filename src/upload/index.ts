import github from '../service/github';

const info = document.getElementById('info');

const dragzone = window['dragzone'];

dragzone('container', (file) => {
  const formdata = new FormData();
  formdata.append('file', file);

  upload(file).then((result:any) => {
    console.log(result);
    const path = result.data.content.path;
    const cdnUrl = `https://cdn.jsdelivr.net/gh/fujinxiang/statics/${path}`;
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
      console.log(e.target.result);

      //@ts-ignore
      const content = e.target.result.replace(/data.*base64,/g, '');
      const path = `${Date.now()}-${file.name}`;
      const message = 'add file';
      github.createRepoFile(content, path, message).then(resolve).catch(reject);
    };
  });
}
