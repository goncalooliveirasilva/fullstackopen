import { useId, useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'
import { Input } from './Input.styles'
import styled from 'styled-components'

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: Linen;
`

const LoginFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-width: 320px;

  h2 {
    text-align: center;
    margin-bottom: 16px;
    color: #333;
    font-size: 24px;
  }

  label {
    font-weight: 600;
    margin-bottom: 4px;
    font-size: 14px;
  }

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 10px;
    background-color: #c39c0cff;
    color: white;
    font-weight: 600;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #94770bff;
    }
  }
`

const LoginForm = () => {
  const usernameID = useId()
  const passwordID = useId()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      // displayNotifics('Login successfully :)', true)
      // Redux
      dispatch(setNotification('Login successfully :)', true))
    } catch (exception) {
      // displayNotifics('Wrong username or password!', false)
      // Redux
      dispatch(setNotification('Wrong username or password!', false))
      console.log(exception)
    }
  }

  return (
    <LoginWrapper>
      <LoginFormContainer onSubmit={handleLogin}>
        <h2>Log in:</h2>
        <div>
          <label htmlFor={usernameID}>Username</label>
          <Input
            id={usernameID}
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={passwordID}>Password</label>
          <Input
            id={passwordID}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </LoginFormContainer>
    </LoginWrapper>
  )
}

export default LoginForm
