import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return {
        message: action.payload.message,
        success: action.payload.success,
      }
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const setNotification = (message, success = true, timeout = 3000) => {
    dispatch({ type: 'SET', payload: { message, success } })
    setTimeout(() => dispatch({ type: 'CLEAR' }), timeout)
  }

  return { notification, setNotification }
}

export default NotificationContext
