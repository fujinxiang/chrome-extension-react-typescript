import React from 'react';
import ReactDOM from 'react-dom';

const Options = ()=>{
    return <div>Options</div>
}

chrome.tabs.query({ active: true, currentWindow: true }, tab => {
    ReactDOM.render(<Options />, document.getElementById('root'));
});
