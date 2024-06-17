import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from './context/AuthContext.tsx'
import ToastsProvider from './context/ToastsContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <AuthProvider>
      <ToastsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ToastsProvider>
    </AuthProvider>
  </Router>
)
