import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import { useQuery, useMutation } from '@apollo/client/react'
import { useState, useEffect } from 'react'

const Authors = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authors = useQuery(ALL_AUTHORS)
  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Author not found!')
      setTimeout(() => setError(null), 5000)
    }
  }, [result.data])

  if (authors.loading) {
    return <div>loading...</div>
  }

  // console.log(authors)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateAuthor({ variables: { name, born: Number(born) } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={handleSubmit}>
          <div>
            name
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born
            <input
              type="text"
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update auhtor</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
