import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Users from './components/Users'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const style = {
    padding: 5,
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  // console.log('user:', user)

  // return (
  //   <div>
  //     <div>
  //       <Notification />
  //     </div>
  //     {user === null ? <LoginForm /> : <MainPage />}
  //   </div>
  // )
  return (
    <>
      <BrowserRouter>
        <div>
          <Link style={style} to={'/users'}>
            Users
          </Link>
        </div>
        <Routes>
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
