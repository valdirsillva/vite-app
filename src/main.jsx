import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { StoreProvider } from './context/product-store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <StoreProvider>
        <App />
     </StoreProvider>
  </StrictMode>,
)
