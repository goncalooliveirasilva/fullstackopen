import { useId, useState } from "react"
import blogService from '../services/blogs'

const NewBlogForm = () => {
  const titleId = useId()
  const authorId = useId()
  const urlId = useId()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewNote = async (e) => {
    e.preventDefault()
    try {
      await blogService.add({
        title,
        author,
        url
      })

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
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
        <button type="submit">create</button>
      </div>
    </form>
  </>
}

export default NewBlogForm