import { ALL_BOOKS, ME } from '../queries'
import { useQuery } from '@apollo/client/react'

const Recommendations = () => {
  const currentUser = useQuery(ME)
  const favoriteGenre = currentUser?.data?.me?.favoriteGenre
  const books = useQuery(ALL_BOOKS, {
    skip: !favoriteGenre,
    variables: { genre: favoriteGenre },
  })

  if (currentUser.loading || books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      {books.data.allBooks.length > 0 ? (
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
      ) : (
        <p>No books found.</p>
      )}
    </div>
  )
}

export default Recommendations
