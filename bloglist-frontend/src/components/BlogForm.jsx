import { useState } from 'react'
import blogService from '../services/blogs'
const BlogForm = (blogs, handleErrorMessageChange, errorMessage) => {
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
      setErrorMessage('Blog added!')
      //handleErrorMessageChange('Blog added!')
    } catch (error) {
      setErrorMessage(error.response.data.error)
      handleErrorMessageChange(error.response.data.error)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      Title:
      <input type="text" onChange={({ target }) => setTitle(target.value)} />
      <br />
      Author:
      <input type="text" onChange={({ target }) => setAuthor(target.value)} />
      <br />
      URL: <input type="text" onChange={({ target }) => setUrl(target.value)} />
      <br />
      <button type="submit">Create Blog</button>
    </form>
  )
}

export default BlogForm
