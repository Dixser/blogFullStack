import { useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserProvider, useUser } from './contexts/UserContext'
import { NotificationProvider } from './contexts/NotificationContext'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogSection from './components/BlogSection'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
const AppContent = () => {
  const { user, logout } = useUser()
  const blogFormRef = useRef()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })

  if (result.isLoading) return <div>Loading...</div>
  const blogs = result.data

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogSection blogs={blogs} user={user} />
      <p>
        {user.name} logged in <button onClick={logout}>logout</button>
      </p>
    </div>
  )
}

const App = () => {
  return (
    <NotificationProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </NotificationProvider>
  )
}

export default App
