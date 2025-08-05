import Blog from "./Blog"
import NewBlogForm from "./NewBlogForm"
import Togglable from "./Togglable"

const MainPage = ({ username, blogs, setUser, setBlogs, displayNotifics }) => {
  const onHandleClick = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    setUser(null)
  }
  return <>
    <h2>Blogs</h2>
    <div>
      <p>
        {username} logged in
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
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </>
}

export default MainPage