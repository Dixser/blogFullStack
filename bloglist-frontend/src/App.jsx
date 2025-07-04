import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogSection from './components/BlogSection'
import loginService from './services/login'
import ErrorMessage from './components/ErrorMessage'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleErrorMessageChange('Wrong credentials')
    }
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleErrorMessageChange = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const removeBlog = async (blog) => {
    const filteredBlogs = blogs.filter((item) => {
      return item.id !== blog.id
    })
    setBlogs(filteredBlogs)
    handleErrorMessageChange('The blog has been removed')
  }
  const blogFormRef = useRef()
  return (
    <>
      <ErrorMessage message={errorMessage} />
      <h2>blogs</h2>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      ) : (
        <>
          <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
            <BlogForm
              blogs={blogs}
              handleErrorMessageChange={handleErrorMessageChange}
            />
          </Togglable>
          <BlogSection
            blogs={blogs}
            user={user}
            handleLogout={handleLogout}
            handleErrorMessageChange={handleErrorMessageChange}
            removeBlog={removeBlog}
          />
        </>
      )}
    </>
  )
}

export default App
