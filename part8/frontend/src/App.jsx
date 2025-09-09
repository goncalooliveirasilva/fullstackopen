import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import NavButton from './components/NavButton'
import Notification from './components/Notification'

const App = () => {
  const [error, setError] = useState(null)
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState('')
  const [success, setSuccess] = useState(false)
  const client = useApolloClient()

  useEffect(() => {
    const loadedToken = localStorage.getItem('library-user-token')
    if (loadedToken) {
      setToken(loadedToken)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  const displayNotification = (notification, success) => {
    setNotification(notification)
    setSuccess(success)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  return (
    <BrowserRouter>
      <Notification notification={notification} success={success} />
      {error && (
        <div style={{ color: 'red', fontSize: '30px', fontWeight: 'bold' }}>
          {error}
        </div>
      )}
      <div>
        <NavButton to={'/'}>authors</NavButton>
        <NavButton to={'/books'}>books</NavButton>
        {token && <NavButton to={'/add'}>add</NavButton>}
        {!token && <NavButton to={'/login'}>login</NavButton>}
        {token && <NavButton onClick={logout}>logout</NavButton>}
      </div>
      <Routes>
        <Route path="/" element={<Authors setError={setError} />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/add"
          element={
            token ? (
              <NewBook displayNotification={displayNotification} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to={'/'} />
            ) : (
              <LoginForm
                setToken={setToken}
                displayNotification={displayNotification}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
