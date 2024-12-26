//import BlogForm from './BlogForm'
import { useState } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Toggable'
const BlogSection = ({
  blogs,
  user,
  handleLogout,
  handleSubmit,
  errorMessage,
}) => {
  const BlogForm = (blogs, handleSubmit, errorMessage) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    return (
      <form onSubmit={handleSubmit}>
        title:
        <input type="text" onChange={({ target }) => setTitle(target.value)} />
        <br />
        author:
        <input type="text" onChange={({ target }) => setAuthor(target.value)} />
        <br />
        url:{' '}
        <input type="text" onChange={({ target }) => setUrl(target.value)} />
        <br />
        <button type="submit">create blog</button>
      </form>
    )
  }
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
        <Togglable buttonLabel={"New Blog"}>

        <BlogForm
          blogs={blogs}
          handleSubmit={handleSubmit}
          errorMessage={errorMessage}
          />
          </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default BlogSection
