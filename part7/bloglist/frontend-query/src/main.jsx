import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './components/NotificationContext.jsx'
import { UserContextProvider } from './components/UserContext.jsx'
import App from './App.jsx'

const FallbackComponent = ({ error }) => {
  return (
    <div role="alert">
      <p>An error has occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <QueryClientProvider client={queryClient}>
        <NotificationContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </NotificationContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
