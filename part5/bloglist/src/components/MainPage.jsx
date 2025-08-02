import Blog from "./Blog"
import NewBlogForm from "./NewBlogForm"

const Content = ({ username, blogs, setUser }) => {
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
      <NewBlogForm />
    </div>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </>
}

export default Content