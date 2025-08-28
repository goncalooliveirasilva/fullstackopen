import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import App from './App.jsx'


const FallbackComponent = ({ error }) => {
  return (
    <div role='alert'>
      <p>An error has occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
