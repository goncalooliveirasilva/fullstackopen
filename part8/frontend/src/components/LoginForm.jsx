import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'
import { useNavigate } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const LoginForm = ({ setToken, displayNotification }) => {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [login] = useMutation(LOGIN)

  const submit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await login({ variables: { username, password } })
      const token = data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      navigate('/')
    } catch (error) {
      displayNotification(error.message, false)
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <form onSubmit={submit}>
        <div>
          name
          <input
            type="text"
            value={username}
            onChange={({ target }) => setName(target.value)}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            style={{ marginLeft: '10px' }}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
