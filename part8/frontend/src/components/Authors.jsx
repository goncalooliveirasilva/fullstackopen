import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client/react'

const Authors = () => {
  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading) {
    return <div>loading...</div>
  }

  // console.log(authors)

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
    </div>
  )
}

export default Authors
