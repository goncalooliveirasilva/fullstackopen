import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import Blogs from './Blogs'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const MainPage = ({ user, setUser }) => {
  const blogFormRef = useRef()
  // const [blogs, setBlogs] = useState([])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (result.isLoading) {
    return <p>Loading blogs...</p>
  }

  const blogs = result.data

  // useEffect(() => {
  //   blogService.getAll()
  //     .then(blogs => setBlogs(blogs))
  // }, [])

  const onHandleClick = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    setUser(null)
  }
  return (
    <>
      <h2>Blogs</h2>
      <div>
        <p>
          {user.name} logged in
          <button onClick={onHandleClick}>logout</button>
        </p>
      </div>
      <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
        <NewBlogForm ref={blogFormRef} />
      </Togglable>
      <Blogs blogs={blogs} username={user.username} />
    </>
  )
}

export default MainPage
