import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import blogService from './services/blogs'
import Notification from './components/Notification'

function App() {
  const [user, setUser] = useState(null)

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
      <div>
        <Notification />
      </div>
      { user === null
        ? <LoginForm setUser={setUser} />
        : <MainPage user={user} setUser={setUser} />
      }
    </div>
  )
}

export default App
