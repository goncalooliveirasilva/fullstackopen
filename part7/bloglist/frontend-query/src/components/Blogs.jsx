import blogService from '../services/blogs'
import Blog from './Blog'
import { useNotification } from './NotificationContext'

const Blogs = ({ blogs, setBlogs, username }) => {
  const { setNotification } = useNotification()
  const handleRemoveClick = async (blog) => {
    const confirm = window.confirm(
      `Remove Blog ${blog.title} by ${blog.author}`,
    )
    if (!confirm) return
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      setNotification(`Blog "${blog.title} removed!"`)
    } catch (error) {
      console.log(error)
    }
  }

  blogs.sort((a, b) => b.likes - a.likes)
  return blogs.map((blog) => {
    return (
      <Blog
        key={blog.id}
        blog={blog}
        handleRemoveClick={handleRemoveClick}
        username={username}
      />
    )
  })
}

export default Blogs
