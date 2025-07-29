import { createContext, useReducer, useCallback, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.payload
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  const clearNotification = useCallback(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }, [])

  const setNotification = useCallback((message, timeout = 5) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: message })
    const timer = setTimeout(() => {
      clearNotification()
    }, timeout * 1000)
    return () => clearTimeout(timer)
  }, [clearNotification])

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
