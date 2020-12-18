import React, { useEffect } from "react";
import "./Popup.less";

export default function Popup() {
  useEffect(() => {
    chrome.runtime.sendMessage({ popupMounted: true });
  }, []);

  return <div className="popupContainer">Popup 页面</div>;
}
