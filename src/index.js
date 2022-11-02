import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { AppAuthContextProvider } from './contex/AppAuthContexProvider';
import {Provider} from 'react-redux';
import store from './store'
// axios.defaults.baseURL = 'http://192.168.18.29:8080';

axios.defaults.baseURL = 'http://174.138.126.246:8080';

// axios.defaults.headers.common[ 'content-type'] = 'application/json'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<Provider store={store}>
  {/* <AppAuthContextProvider> */}
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  {/* </AppAuthContextProvider> */}
</Provider>
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
