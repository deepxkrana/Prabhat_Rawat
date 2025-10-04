import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

const rootElement = document.getElementById('root')

if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<div style="color: white; padding: 20px;">Error: Root element not found</div>'
} else {
  console.log('Root element found, rendering app...')
  try {
    createRoot(rootElement).render(
      <>
        <App />
        <Analytics />
        <SpeedInsights />
      </>
    )
    console.log('App rendered successfully')
  } catch (error) {
    console.error('Error rendering app:', error)
    rootElement.innerHTML = `<div style="color: white; padding: 20px;">Error: ${error.message}</div>`
  }
}
