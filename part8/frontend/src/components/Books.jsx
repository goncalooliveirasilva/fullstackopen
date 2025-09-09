import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useQuery } from '@apollo/client/react'
import { useState } from 'react'

const Books = () => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre },
  })
  const genres = useQuery(ALL_GENRES)

  if (books.loading || genres.loading) {
    return <div>loading...</div>
  }
  // console.log(books)
  return (
    <div>
      <h2>books</h2>
      {selectedGenre ? (
        <p>
          in genre <b>{selectedGenre}</b>
        </p>
      ) : (
        <p>all genres</p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h4>Filter by genre:</h4>
        <select
          value={selectedGenre}
          onChange={({ target }) => setSelectedGenre(target.value)}
        >
          <option key={'null-genre'} value={''}>
            {'all'}
          </option>
          {genres.data.allGenres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Books
