import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
