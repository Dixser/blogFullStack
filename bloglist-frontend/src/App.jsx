import { useEffect, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { UserProvider, useUser } from './contexts/UserContext'
import { NotificationProvider } from './contexts/NotificationContext'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogSection from './components/BlogSection'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import UserProfile from './components/UserProfile'
import BlogDetail from './components/BlogDetail'
import Navigation from './components/Navigation'
import Notification from './components/Notification'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './styles/app.css'

const AppContent = () => {
  const { user } = useUser()
  const blogFormRef = useRef()
  const navigate = useNavigate()
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  })
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (result.isLoading) return <div>Loading...</div>
  const blogs = result.data

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogSection blogs={blogs} />
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <NotificationProvider>
        <UserProvider>
          <Navigation />
          <Notification />
          <Routes>
            <Route path="/" element={<AppContent />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
          </Routes>
        </UserProvider>
      </NotificationProvider>
    </Router>
  )
}

export default App
