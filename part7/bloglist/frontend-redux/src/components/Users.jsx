import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setAllUsers } from '../reducers/allUsersReducer'
import usersService from '../services/users'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  background-color: Linen;
`

const UsersTable = styled.table`
  border-collapse: collapse;
  width: 80%;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  thead {
    background-color: burlywood;
    color: white;
    font-weight: 600;
  }

  tbody tr:hover {
    background-color: #fcf0d6ff;
    transition: background-color 0.3s ease;
  }

  td a {
    color: #d69b07ff;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`

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
    <UsersWrapper>
      <h2>Users</h2>
      <UsersTable>
        <thead>
          <tr>
            <th>Users</th>
            <th>
              <b>Blogs created</b>
            </th>
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
      </UsersTable>
    </UsersWrapper>
  )
}

export default Users
