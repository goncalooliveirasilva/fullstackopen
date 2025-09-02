import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './store.js'


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
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)
