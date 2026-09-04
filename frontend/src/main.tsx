import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/* 
   LOAD SAVED THEME
  */

const savedTheme =
  localStorage.getItem('docusaarthi-theme')

if (savedTheme === 'dark') {
  document.documentElement.dataset.theme = 'dark'
} else {
  document.documentElement.dataset.theme = 'light'
}


/* 
   RENDER APP
  */

createRoot(
  document.getElementById('root')!,
).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)