import Blog from "./Blog"
import LogoutButton from "./LogoutButton"

const Content = ({ username, blogs, setUser }) => {
  return <>
    <h2>Blogs</h2>
    <div>
      <p>
        {username} logged in
        <LogoutButton setUser={setUser} />
      </p>
    </div>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
  </>
}

export default Content