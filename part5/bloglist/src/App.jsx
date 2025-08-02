import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Content from './components/Content'
import blogService from './services/blogs'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  return (
    <div>
      { user === null && <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        setUser={setUser}
      /> }
      { user !== null && <Content username={user.name} blogs={blogs} />}
    </div>
  )
}

export default App
