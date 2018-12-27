import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styles from './index.scss';

const rootElement = document.createElement('div');
rootElement.className = styles['CW-root'];
ReactDOM.render(<App className={styles}/>, rootElement);
document.body.appendChild(rootElement);
