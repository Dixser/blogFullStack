import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
  const loginForm = () => {
    const handleLogin = async (event) => {
      event.preventDefault()

      try {
        const user = await loginService.login({
          username,
          password,
        })

        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        ) 
        blogService.setToken(user.token)

        setUser(user)
        setUsername('')
        setPassword('')
      } catch (exception) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
    return (
      <>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              autoComplete='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              autoComplete='current-password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </>
    )
  }
const handleLogout = () => {
  setUser(null)
  window.localStorage.removeItem('loggedBlogappUser')
}
  const blogForm = () => {
    return (
      <>
        <div>
          <h2>blogs</h2>
          <p>
            <strong>{user.username}</strong> logged in{' '}
            <button type='button' onClick={handleLogout}>
              logout
            </button>
          </p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <h1>{errorMessage}</h1>

      {user === null ? loginForm() : blogForm()}
    </>
  )
}

export default App
