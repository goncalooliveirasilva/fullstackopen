import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import Blog from "./Blog"
import { setNotification } from '../reducers/notificationReducer'
import { useSelector } from 'react-redux'
import { removeBlog } from '../reducers/blogsReducer'

const Blogs = ({ username }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  // console.log('bbb', blogs)

  const handleRemoveClick = async (blog) => {
    const confirm = window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)
    if (!confirm) return
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(setNotification(`Blog "${blog.title} removed successfully!"`, true))      
    } catch (error) {
      dispatch(setNotification('Blog not removed. Something bad happened!', false))
      console.log(error)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    sortedBlogs.map(blog => {
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