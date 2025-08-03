import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import blogService from './services/blogs'
import Notification from './components/Notification'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [successNotification, setSuccessNotification] = useState(false)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayNotifics = (message, success) => {
    setSuccessNotification(success)
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div>
      <div>
        { notification !== null &&  <Notification 
            message={notification}
            isSuccessful={successNotification}
          />
        }
      </div>
      { user === null && <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          displayNotifics={displayNotifics}
        /> 
      }
      { user !== null && <MainPage
          displayNotifics={displayNotifics}
          username={user.name}
          blogs={blogs}
          setUser={setUser}
          setBlogs={setBlogs} 
        />
      }
    </div>
  )
}

export default App
