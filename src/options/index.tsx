import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const SettingGroup = ({ title, keys }) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    const initValues = {};
    keys.map((k) => {
      const v = localStorage.getItem(k);
      initValues[k] = v;
    });

    setValues(initValues);
  }, []);

  const textChanged = (e) => {
    const value = e.target.value;
    const id = e.target.dataset['id'];
    setValues((prev) => ({ ...prev, [id]: value }));
    console.log(e.target);
  };

  const saveData = () => {
    Object.keys(values).map((k) => localStorage.setItem(k, values[k]));
  };

  return (
    <div>
      {title}
      <div>
        {keys.map((k) => (
          <input key={k} type='text' data-id={k} value={values[k]} onChange={textChanged} />
        ))}
        <button onClick={saveData}>保存</button>
      </div>
    </div>
  );
};

const Options = () => {
  return (
    <div>
      <h2>设置内容</h2>
      <div>
        <SettingGroup title='Gitee 设置' keys={['gitee-account', 'gitee-password', 'gitee-clientId', 'gitee-clientSecret']} />
      </div>
    </div>
  );
};

ReactDOM.render(<Options />, document.getElementById('root'));
