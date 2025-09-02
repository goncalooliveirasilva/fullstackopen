import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAllUsers } from '../reducers/allUsersReducer'
import usersService from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
  const allUsers = useSelector((state) => state.allUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!allUsers || allUsers.length === 0) {
      usersService.getUsers().then((users) => dispatch(setAllUsers(users)))
    }
  }, [dispatch, allUsers])

  if (!allUsers) return <p>Loading users...</p>

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>Users</td>
            <td>
              <b>Blogs created</b>
            </td>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
