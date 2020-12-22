import React from 'react';
import ReactDOM from 'react-dom';

const Options = ()=>{
    return <div>设置内容</div>
}

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
    ReactDOM.render(<Options />, document.getElementById('root'));
});
