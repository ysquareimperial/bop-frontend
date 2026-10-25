import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import App from './App'
import { OrderProvider } from './context/Order'
import '@fontsource-variable/bricolage-grotesque/wdth.css'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <OrderProvider>
          <App />
        </OrderProvider>
      </MotionConfig>
    </BrowserRouter>
  </React.StrictMode>,
)
