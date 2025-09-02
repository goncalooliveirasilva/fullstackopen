import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    },
  },
})

export const { setAllUsers } = allUsersSlice.actions
export default allUsersSlice.reducer
