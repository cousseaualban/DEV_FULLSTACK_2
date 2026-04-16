import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './bloc_personnalisés/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
