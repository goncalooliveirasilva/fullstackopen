import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const { id } = useParams()
  const allUsers = useSelector((state) => state.allUsers)
  const user = allUsers.find((u) => String(u.id) === id)

  if (!user) return <p>Loading user...</p>

  return (
    <>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
