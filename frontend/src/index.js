import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/bootstrap.min.css';
import './assets/styles/icofont.min.css';
import './assets/styles/responsive.scss';
import './assets/styles/animate.min.css';
import './assets/styles/style.scss';
import { BrowserRouter } from 'react-router-dom'
ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
