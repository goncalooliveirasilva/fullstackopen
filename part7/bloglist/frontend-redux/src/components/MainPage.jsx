import { useEffect, useRef } from 'react'
import Blogs from './Blogs'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'

const MainPage = () => {
  const blogFormRef = useRef()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [])

  return (
    <>
      <h2>blog app</h2>
      <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
        <NewBlogForm ref={blogFormRef} />
      </Togglable>
      <Blogs username={user.username} />
    </>
  )
}

export default MainPage
