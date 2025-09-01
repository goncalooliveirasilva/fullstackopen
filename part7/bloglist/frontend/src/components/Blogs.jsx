import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import Blog from "./Blog"
import { setNotification } from '../reducers/notificationReducer'

const Blogs = ({ blogs, setBlogs, username }) => {
  const dispatch = useDispatch()

  const handleRemoveClick = async (blog) => {
    const confirm = window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)
    if (!confirm) return
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      dispatch(setNotification(`Blog "${blog.title} removed successfully!"`, true))      
    } catch (error) {
      dispatch(setNotification('Blog not removed. Something bad happened!', false))
      console.log(error)
    }
  }

  blogs.sort((a, b) => b.likes - a.likes)
  return (
    blogs.map(blog => {
      return <Blog 
        key={blog.id}
        blog={blog}
        handleRemoveClick={handleRemoveClick}
        username={username}
      />
    })
  )
}

export default Blogs