// frontend/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' // Ye import karo
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx' // Auth Context import karo

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Auth Context provider se app ko wrap kar do */}
    <CartProvider> {/* Cart Context provider se app ko wrap kar do */}
    <BrowserRouter>  {/* App ko iske andar band kar do */}
      <App />
    </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)