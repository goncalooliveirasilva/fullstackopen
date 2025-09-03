import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import MainPage from './components/MainPage'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const style = {
    padding: 1,
  }

  const onHandleClick = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    dispatch(setUser(null))
  }

  return (
    <div>
      <Notification />
      {currentUser ? (
        <>
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: 'aquamarine',
            }}
          >
            <Link style={style} to="/">
              Blogs
            </Link>
            <Link style={style} to="/users">
              Users
            </Link>
            <span style={{ marginLeft: 'auto' }}>
              {currentUser.name} logged in
              <button onClick={onHandleClick} style={{ marginLeft: '0.5rem' }}>
                logout
              </button>
            </span>
          </nav>

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  )
}

export default App
