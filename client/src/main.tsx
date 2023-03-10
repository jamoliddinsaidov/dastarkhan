import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './configs/i18next'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <React.Suspense fallback='Loading...'>
        <App />
      </React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
