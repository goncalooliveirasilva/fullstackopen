import { useEffect,  useRef } from "react"
import Blogs from "./Blogs"
import NewBlogForm from "./NewBlogForm"
import Togglable from "./Togglable"
import blogService from '../services/blogs'
import { setBlogs } from "../reducers/blogsReducer"
import { useDispatch } from "react-redux"

const MainPage = ({ user, setUser }) => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll()
      .then(blogs => dispatch(setBlogs(blogs)))
  }, [])

  const onHandleClick = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    setUser(null)
  }
  return <>
    <h2>Blogs</h2>
    <div>
      <p>
        {user.name} logged in
        <button onClick={ onHandleClick }>logout</button>
      </p>
    </div>
    <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
      <NewBlogForm ref={blogFormRef} />
    </Togglable>
    <Blogs username={user.username} />
  </>
}

export default MainPage