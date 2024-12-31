//import BlogForm from './BlogForm'
import { useState } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Toggable'

/* const BlogForm = (blogs, handleSubmit, errorMessage) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  console.log("BlogForm",handleSubmit);
  return (
    <form onSubmit={handleSubmit}>
      Title:
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br />
      Author:
      <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      URL:
      <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br />
      <button type="submit">Create Blog</button>
    </form>
  )
} */

const BlogSection = ({
  blogs,
  user,
  handleLogout,
  handleSubmit,
  errorMessage,
  title,
  author,
  url,
}) => {
  console.log('BlogSection', handleSubmit)
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
        <Togglable buttonLabel={'New Blog'}>
          <form onSubmit={handleSubmit}>
            Title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
            <br />
            Author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
            <br />
            URL:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <br />
            <button type="submit">Create Blog</button>
          </form>
          {/*           <BlogForm
            blogs={blogs}
            handleSubmit={handleSubmit}
            errorMessage={errorMessage}
          /> */}
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default BlogSection
