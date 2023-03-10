import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './configs/i18next'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <React.Suspense fallback='Loading...'>
      <App />
    </React.Suspense>
  </React.StrictMode>
)
