import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const content = <StrictMode><App /></StrictMode>

const path = window.location.pathname.replace(/\/+$/, '') || '/'
if (root.hasChildNodes() && root.dataset.renderedPath === path) hydrateRoot(root, content)
else createRoot(root).render(content)
