import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';
const { REACT_APP_API } = process.env;

axios.defaults.baseURL = REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
