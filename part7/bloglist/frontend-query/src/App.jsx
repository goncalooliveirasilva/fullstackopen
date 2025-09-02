import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useNotification } from './components/NotificationContext'

function App() {
  const [user, setUser] = useState(null)
  const { notification } = useNotification()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // console.log('user:', user)

  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          isSuccessful={notification.success}
        />
      )}
      {user === null ? (
        <LoginForm setUser={setUser} />
      ) : (
        <MainPage user={user} setUser={setUser} />
      )}
    </div>
  )
}

export default App
