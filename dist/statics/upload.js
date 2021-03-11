const container = document.getElementById('container');
const info = document.getElementById('info');
const tip = document.getElementById('tip');

dragzone('container', (file) => {
  const formdata = new FormData();
  formdata.append('file', file);

  tip.style.display = 'none';
  addImg(file);

  upload(file).then((result) => {
    console.log(result);

    const data = result.data;
    addInfo(`${data.web_url}`);
    addInfo(`![](${data.web_url})`);

    formdata.append('filename', `${data.web_uri}.png`);
    const filename = `database/${data.web_uri}.png`;
    Webdav.upload(encodeURIComponent(filename), file).then((result) => {
        addInfo('已记录在坚果云');
      })
      .catch((error) => {
        console.log(error);
        addInfo('失败！未能添加到坚果云');
      });
  });
});

function addInfo(text) {
  const appendInfo = document.createElement('input');
  appendInfo.type = 'text';
  appendInfo.value = text;
  info.append(appendInfo);
}

function addImg(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img = document.createElement('img');
    img.src = reader.result;
    container.append(img);
  };
}

function upload(file) {
  const formData = new FormData();
  formData.append('photo', file, { filename: 'name.png' });

  return axios({
    url: `https://mp.toutiao.com/upload_photo/?type=json`,
    method: 'POST',
    data: formData,
  });
}