import { useId, useState } from "react"
import blogService from '../services/blogs'

const NewBlogForm = ({ setBlogs, blogs, displayNotifics }) => {
  const titleId = useId()
  const authorId = useId()
  const urlId = useId()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
 
  const handleNewNote = async (e) => {
    e.preventDefault()
    try {
      if (title.length === 0) {
        displayNotifics('Title is empty!', false)
        return
      }
      if (author.length === 0) {
        displayNotifics('Author is empty!', false)
        return
      }
      if (url.length === 0) {
        displayNotifics('Url is empty!', false)
        return
      }
      const response = await blogService.add({
        title,
        author,
        url
      })
      console.log(response)
      setBlogs([...blogs, response])
      setTitle('')
      setAuthor('')
      setUrl('')
      displayNotifics(`New Blog "${response.title}" added!`, true)
    } catch (exception) {
      displayNotifics('New blog not saved! Something bad happened :(', false)
      console.log(exception)
    }
  }

  return <>
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
}

export default NewBlogForm