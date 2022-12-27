import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import RotasPrincipais from './routes';
import GlobalStyles from "./styles/GlobalStyles";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RotasPrincipais />
      <GlobalStyles />
    </BrowserRouter>
  </React.StrictMode>
)
