import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationAction(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const setNotification = (notification, time) => {
  return dispatch => {
    dispatch(setNotificationAction(notification))
    setTimeout(() => dispatch(removeNotification()), time*1000)
  }
}

export const { setNotificationAction, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer