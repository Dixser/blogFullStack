import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogSection from './components/BlogSection'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event.target.title)

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      blogs.push(newBlog)
      handleErrorMessageChange('Blog added!')
    } catch (error) {
      handleErrorMessageChange(error.response.data.error)
    }
  }
  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)
  const handleErrorMessageChange = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
console.log("function",handleSubmit);

  return (
    <>
      <h1>{errorMessage}</h1>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      ) : (
        <BlogSection
          blogs={blogs}
          user={user}
          handleLogout={handleLogout}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
          title={title}
          author={author}
          url={url}
        />
      )}
    </>
  )
}

export default App
