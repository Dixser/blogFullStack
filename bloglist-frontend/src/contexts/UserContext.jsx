import { createContext, useContext, useReducer, useState, useCallback, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNotification } from './NotificationContext'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    case 'LOGOUT_USER':
      return null
    default:
      return state
  }
}

export const UserContext = createContext(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)
  const [initialized, setInitialized] = useState(false)
  const [, setNotification] = useNotification()

  const login = useCallback(
    async (username, password) => {
      try {
        const user = await loginService.login({
          username,
          password,
        })
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({ type: 'SET_USER', payload: user })
        return user
      } catch (exception) {
        setNotification('Wrong credentials', 5)
        throw exception
      }
    },
    [setNotification],
  )

  const logout = useCallback(() => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({ type: 'LOGOUT_USER' })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({ type: 'SET_USER', payload: user })
    }
    setInitialized(true)
  }, [])

  if (!initialized) return null

  const value = {
    user,
    login,
    logout,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
