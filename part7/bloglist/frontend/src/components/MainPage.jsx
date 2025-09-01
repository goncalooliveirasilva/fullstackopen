import { useEffect, useState, useRef } from "react"
import Blogs from "./Blogs"
import NewBlogForm from "./NewBlogForm"
import Togglable from "./Togglable"
import blogService from '../services/blogs'

const MainPage = ({ user, setUser }) => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
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
      <NewBlogForm
        setBlogs={setBlogs}
        blogs={blogs}
        ref={blogFormRef}
      />
    </Togglable>
    <Blogs blogs={blogs} setBlogs={setBlogs} username={user.username} />
  </>
}

export default MainPage