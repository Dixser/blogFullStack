//import BlogForm from './BlogForm'
import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Toggable'
import PropTypes from 'prop-types'

const BlogSection = ({
  blogs,
  user,
  handleLogout,
  handleErrorMessageChange,
  removeBlog,
}) => {
  const blogFormRef = useRef()

  const BlogForm = (errorMessage) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const handleSubmit = async (event) => {
      event.preventDefault()
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
        console.log(error.message)

        handleErrorMessageChange(error.response.data.error)
      }
    }
    const handleTitleChange = ({ target }) => setTitle(target.value)
    const handleAuthorChange = ({ target }) => setAuthor(target.value)
    const handleUrlChange = ({ target }) => setUrl(target.value)

    return (
      <form onSubmit={handleSubmit}>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
        <br />
        Author:
        <input type="text" value={author} onChange={handleAuthorChange} />
        <br />
        URL:
        <input type="text" value={url} onChange={handleUrlChange} />
        <br />
        <button type="submit">Create Blog</button>
      </form>
    )
  }

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <>
      <div>
        <h2>blogs</h2>
        <p>
          <strong>{user.username}</strong> logged in{' '}
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </p>
        <Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
          <BlogForm />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
        ))}
      </div>
    </>
  )
}
BlogSection.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleErrorMessageChange: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}
export default BlogSection
