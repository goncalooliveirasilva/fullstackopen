import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import blogService from './services/blogs'
import Notification from './components/Notification'

function App() {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [successNotification, setSuccessNotification] = useState(false)

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

  // console.log('user:', user)

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
          setUser={setUser}
          displayNotifics={displayNotifics}
        /> 
      }
      { user !== null && <MainPage
          displayNotifics={displayNotifics}
          user={user}
          setUser={setUser}
        />
      }
    </div>
  )
}

export default App
