import { useId, useState } from 'react'
import blogService from '../services/blogs'
import { useNotification } from './NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const NewBlogForm = ({ ref }) => {
  const titleId = useId()
  const authorId = useId()
  const urlId = useId()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { setNotification } = useNotification()
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.add,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
      setNotification('New blog added successfully!')
      ref.current.toggleVisibility()
    },
    onError: () => {
      setNotification('Failed to create blog.', false)
    },
  })

  const handleNewNote = async (e) => {
    e.preventDefault()
    if (title.length === 0) {
      // displayNotifics('Title is empty!', false)
      setNotification('Title is empty!', false)
      return
    }
    if (author.length === 0) {
      // displayNotifics('Author is empty!', false)
      setNotification('Author is empty!', false)
      return
    }
    if (url.length === 0) {
      // displayNotifics('Url is empty!', false)
      setNotification('URL is empty!', false)
      return
    }
    newBlogMutation.mutate({ title, author, url })
    // setBlogs([...blogs, response])
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <form onSubmit={handleNewNote}>
        <div>
          <label htmlFor={titleId}>Title:</label>
          <input
            id={titleId}
            type="text"
            value={title}
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={authorId}>Author:</label>
          <input
            id={authorId}
            type="text"
            value={author}
            placeholder="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={urlId}>Url:</label>
          <input
            id={urlId}
            type="text"
            value={url}
            placeholder="url"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  )
}

export default NewBlogForm
