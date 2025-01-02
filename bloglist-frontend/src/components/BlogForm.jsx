import { useState } from 'react'
import blogService from '../services/blogs'
const BlogForm = (blogs, handleErrorMessageChange, errorMessage) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(handleErrorMessageChange)

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
  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  return (
    <form onSubmit={handleSubmit}>
    Title:
    <input
      type="text"
      value={title}
      onChange={handleTitleChange}
    />
    <br />
    Author:
    <input
      type="text"
      value={author}
      onChange={handleAuthorChange}
    />
    <br />
    URL:
    <input
      type="text"
      value={url}
      onChange={handleUrlChange}
    />
    <br />
    <button type="submit">Create Blog</button>
  </form>
  )
}

export default BlogForm
