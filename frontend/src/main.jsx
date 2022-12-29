import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes';
import GlobalStyles from "./styles/GlobalStyles";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRoutes />
      <GlobalStyles />
    </BrowserRouter>
  </React.StrictMode>
)
