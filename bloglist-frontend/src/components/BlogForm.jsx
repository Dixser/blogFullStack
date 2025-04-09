import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = (blogs, handleErrorMessageChange) => {
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
      if (error.response !== undefined) {
        handleErrorMessageChange(error.response.data.error)
      }
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
        placeholder="your title"
        value={title}
        onChange={handleTitleChange}
      />
      <br />
      Author:
      <input
        type="text"
        placeholder="your name"
        value={author}
        onChange={handleAuthorChange}
      />
      <br />
      URL:
      <input
        type="text"
        placeholder="your url"
        value={url}
        onChange={handleUrlChange}
      />
      <br />
      <button type="submit">Create Blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleErrorMessageChange: PropTypes.func.isRequired,
}
export default BlogForm
