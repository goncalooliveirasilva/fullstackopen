import styled, { createGlobalStyle } from 'styled-components'
import { LogoutButton } from './components/StyledButtons.styles'
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

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: Linen;
    font-family: Arial, sans-serif;
  }
`

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: burlywood;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 15px;
  a {
    text-decoration: none;
    color: #000000ff;
    font-weight: bold;
    padding: 1rem 1rem;
    border-radius: 6px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(219, 219, 219, 1);
    }
  }
`

const Page = styled.div`
  padding: 1rem;
`

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
    <>
      <Page>
        <GlobalStyle />
        <Notification />
        {currentUser ? (
          <>
            <Navbar>
              <Link style={style} to="/">
                Blogs
              </Link>
              <Link style={style} to="/users">
                Users
              </Link>
              <span style={{ marginLeft: 'auto' }}>
                <i>{currentUser.name} </i>
                logged in.
                <LogoutButton
                  onClick={onHandleClick}
                  style={{ marginLeft: '0.5rem' }}
                >
                  logout
                </LogoutButton>
              </span>
            </Navbar>

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
      </Page>
    </>
  )
}

export default App
