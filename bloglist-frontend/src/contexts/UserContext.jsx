import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNotification } from './NotificationContext'

export const UserContext = createContext(null)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [, setNotification] = useNotification()

  const login = useCallback(async (username, password) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      return user
    } catch (exception) {
      setNotification('Wrong credentials', 5)
      throw exception
    }
  }, [setNotification])

  const logout = useCallback(() => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }, [])

  // Initialize user from localStorage on mount
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const value = {
    user,
    login,
    logout
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
