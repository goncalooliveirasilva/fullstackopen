import blogService from '../services/blogs'
import Blog from './Blog'
import { useNotification } from './NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blogs = ({ blogs, username }) => {
  const { setNotification } = useNotification()
  const queryClient = useQueryClient()

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs'])
      setNotification('Blog removed successfully!')
    },
    onError: () => {
      setNotification('Failed to remove blog!', false)
    },
  })

  const handleRemoveClick = async (blog) => {
    const confirm = window.confirm(
      `Remove Blog ${blog.title} by ${blog.author}`,
    )
    if (!confirm) return
    removeBlogMutation.mutate(blog.id)
    // try {
    //   await blogService.remove(blog.id)
    //   setBlogs(blogs.filter((b) => b.id !== blog.id))
    // } catch (error) {
    //   console.log(error)
    // }
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
