import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogsReducer'
import { useState } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const BlogDetails = () => {
  const { id } = useParams()
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  if (!blogs) return <div>Loading...</div>

  const blog = blogs.find((b) => String(b.id) === id)
  if (!blog) return <div>Blog not found</div>
  // console.log(blog)

  const handleLikeClick = async () => {
    const updated = { ...blog, likes: blog.likes + 1 }
    try {
      const response = await blogService.update(updated)
      dispatch(updateBlog({ ...response, user: blog.user }))
    } catch (error) {
      console.log('Failed to update likes:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await blogService.addComment(id, comment)
      setComment('')
      dispatch(updateBlog({ ...response }))
      dispatch(setNotification('Comment added!', true))
    } catch (error) {
      console.log('Failed to update comments', error)
    }
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleLikeClick}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <div>
        <h3>comments</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">add comment</button>
          </div>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetails
