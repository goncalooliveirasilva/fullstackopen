import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, username, handleRemoveClick }) => {
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
    lineHeight: 0,
  }
  // console.log('blog user', blog.user)

  return (
    <div style={style}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
}

export default Blog
