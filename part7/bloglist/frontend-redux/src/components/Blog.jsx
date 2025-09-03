import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Card = styled.div`
  padding: 15px 5px 15px 5px;
  border: solid;
  border-width: 1px;
  margin-top: 10px;
  line-height: 1px;
  border-radius: 10px;
  border-color: darkgreen;
  &:hover {
    background-color: #d7efcaff;
    transition: background-color 0.3s ease;
  }
  a {
    text-decoration: none;
    color: darkgreen;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Blog = ({ blog }) => {
  // console.log('blog user', blog.user)

  return (
    <Card>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  handleRemoveClick: PropTypes.func.isRequired,
}

export default Blog
