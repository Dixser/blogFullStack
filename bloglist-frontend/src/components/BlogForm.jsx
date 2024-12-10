import { useState } from "react"
const BlogForm = () => {
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
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      title:{' '}
      <input type="text" onChange={({ target }) => setTitle(target.value)} />
      <br />
      author:{' '}
      <input type="text" onChange={({ target }) => setAuthor(target.value)} />
      <br />
      url: <input type="text" onChange={({ target }) => setUrl(target.value)} />
      <br />
      <button type="submit">create blog</button>
    </form>
  )
}

export default BlogForm
