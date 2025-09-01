import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  // console.log('user:', user)

  return (
    <div>
      <div>
        <Notification />
      </div>
      {user === null ? <LoginForm /> : <MainPage />}
    </div>
  )
}

export default App
