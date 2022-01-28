import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import User from './components/User'
import reportWebVitals from './reportWebVitals';
import { ContractProvider } from './context/ContractProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <ContractProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:userId" element={<User />} />
        </Routes>
      </BrowserRouter>
    </ContractProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
