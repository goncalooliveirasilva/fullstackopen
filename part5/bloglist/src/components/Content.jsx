import Blog from "./Blog"

const Content = ({ username, blogs }) => {
    return <>
        <h2>Blogs</h2>
        <p>{username} logged in</p>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </>
}

export default Content