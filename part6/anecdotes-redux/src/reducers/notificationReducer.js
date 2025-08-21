import { createSlice } from "@reduxjs/toolkit";

const initialState = 'First notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    }
  }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer