/**
 * 获取 32 位伪随机字符串
 *
 * @returns
 */
 function getRandomId() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let nums = "";
  for (let i = 0; i < 32; i++) {
    const id = parseInt((Math.random() * 61).toString());
    nums += chars[id];
  }
  return nums;
}

// 使用utf-8字符集进行base64编码
function utoa(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
// 使用utf-8字符集解析base64字符串
function atou(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

export { getRandomId, utoa, atou };
