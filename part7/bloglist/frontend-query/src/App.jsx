import { useEffect, useContext } from 'react'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useNotification } from './components/NotificationContext'
import UserContext from './components/UserContext'

function App() {
  const [user, dispatch] = useContext(UserContext)
  const { notification } = useNotification()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      dispatch({ type: 'SET', payload: parsedUser })
      blogService.setToken(parsedUser.token)
    }
  }, [dispatch])

  // console.log('user:', user)

  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          isSuccessful={notification.success}
        />
      )}
      {user === null ? <LoginForm /> : <MainPage />}
    </div>
  )
}

export default App
