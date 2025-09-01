import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: '',
  isSuccessful: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers : {
    setNotificationAction(state, action) {
      return {
        message: action.payload.message,
        isSuccessful: action.payload.isSuccessful
      }
    },
    removeNotification(state, action) {
      return initialState
    }
  }
})

export const setNotification = (message, isSuccessful) => {
  return dispatch => {
    dispatch(setNotificationAction({ message, isSuccessful }))
    setTimeout(() => dispatch(removeNotification()), 3000)
  }
}

export const { setNotificationAction, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer