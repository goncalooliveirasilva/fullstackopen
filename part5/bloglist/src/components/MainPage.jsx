import Blog from "./Blog"
import NewBlogForm from "./NewBlogForm"

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
    <div>
      <NewBlogForm
        displayNotifics={displayNotifics}
        setBlogs={setBlogs}
        blogs={blogs} 
      />
    </div>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </>
}

export default MainPage