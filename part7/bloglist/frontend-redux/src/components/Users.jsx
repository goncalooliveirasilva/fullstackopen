import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { setAllUsers } from '../reducers/allUsersReducer'
import usersService from '../services/users'

const Users = (props) => {
  const user = useSelector((state) => state.user)
  const allUsers = useSelector((state) => state.allUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    usersService.getUsers().then((users) => dispatch(setAllUsers(users)))
  }, [])

  const onHandleClick = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    dispatch(setUser(null))
  }

  if (!user) return null
  if (allUsers) console.log(allUsers)

  return (
    <>
      <h2>Blogs</h2>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={onHandleClick}>logout</button>
      </div>
      <div>
        <h2>Users</h2>
        <table>
          <tr>
            <td>Users</td>
            <td>
              <b>Blogs created</b>
            </td>
          </tr>
          {allUsers.map((user) => (
            <tr>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  )
}

export default Users
