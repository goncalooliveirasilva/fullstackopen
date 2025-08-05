import { useEffect, useState } from "react"
import Blogs from "./Blogs"
import NewBlogForm from "./NewBlogForm"
import Togglable from "./Togglable"
import blogService from '../services/blogs'

const MainPage = ({ user, setUser, displayNotifics }) => {
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
    <Togglable buttonLabel={'New Blog'}>
      <NewBlogForm
        displayNotifics={displayNotifics}
        setBlogs={setBlogs}
        blogs={blogs} 
      />
    </Togglable>
    <Blogs blogs={blogs} setBlogs={setBlogs} username={user.username} />
  </>
}

export default MainPage