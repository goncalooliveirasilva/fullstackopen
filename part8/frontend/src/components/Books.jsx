import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client/react'

const Books = () => {
  const books = useQuery(ALL_BOOKS)

  if (books.loading) {
    return <div>loading...</div>
  }
  // console.log(books)
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
