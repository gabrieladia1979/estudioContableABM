import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const content = <StrictMode><App /></StrictMode>

if (root.hasChildNodes()) hydrateRoot(root, content)
else createRoot(root).render(content)
