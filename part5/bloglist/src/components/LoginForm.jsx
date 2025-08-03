import { useId } from "react"
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({username, setUsername, password, setPassword, setUser, displayNotifics}) => {
  const usernameID = useId()
  const passwordID = useId()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogsUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      displayNotifics('Login successfully :)', true)
    } catch (exception) {
      displayNotifics('Wrong username or password!', false)
      console.log(exception)
    }
  }

  return <>
    <h2>Log in:</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor={usernameID}>Username</label>
          <input 
            id={usernameID}
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
      </div>
      <div>
        <label htmlFor={passwordID}>Password</label>
        <input
          id={passwordID}
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </>
}

export default LoginForm