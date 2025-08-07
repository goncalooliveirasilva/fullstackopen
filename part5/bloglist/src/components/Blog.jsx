import { useState } from "react"
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, username, handleRemoveClick }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [liked, setLiked] = useState(false)
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    lineHeight: 0
  }

  const handleViewClick = () => {
    setVisible(!visible)
  }

  const handleLikeClick = async () => {
    const newLikes = liked ? likes - 1 : likes + 1
    try {
      await blogService.update({ ...blog, likes: newLikes })
      setLikes(newLikes)
      setLiked(!liked)
    } catch (error) {
      console.log('Failed to update likes:', error)
    }
  }
  // console.log('blog user', blog.user)
  
  return (
    <div style={style}>
      <div>
        {blog.title}
        <button onClick={handleViewClick}>{visible ? 'Hide' : 'View'}</button>
      </div>
      { visible && 
        <div>
          <p>{blog.url}</p>
          <div>
            {likes}
            <button onClick={handleLikeClick}>{ liked ? 'Dislike' : 'Like' }</button>
          </div>
          <p>{blog.author}</p>
          <p>{blog.user.name}</p>
          { username === blog.user.username &&
            <div>
              <button onClick={() => handleRemoveClick(blog)}>Remove</button>
            </div>
          }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  handleRemoveClick: PropTypes.func.isRequired
}

export default Blog