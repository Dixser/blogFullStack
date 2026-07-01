import { useState } from 'react'
import { create } from '../services/blogs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../contexts/NotificationContext'
const BlogForm = () => {
  const queryClient = useQueryClient()
  const [notification, setNotification] = useNotification()
  const newNoteMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      console.log('Blog added!')
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification('Blog added!', 5)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
    onError: (error) => {
      setNotification(error.response.data.error, 5)
    },
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      newNoteMutation.mutate({
        title,
        author,
        url,
      })
    } catch (error) {
      console.log(error.message)
      setNotification(error.response.data.error, 5)
    }
  }
  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Title:
        <input
          type="text"
          value={title}
          id="title"
          data-testid="title"
          onChange={handleTitleChange}
        />
        <br />
        Author:
        <input
          type="text"
          value={author}
          id="author"
          data-testid="author"
          onChange={handleAuthorChange}
        />
        <br />
        URL:
        <input type="text" value={url} id="url" data-testid="url" onChange={handleUrlChange} />
        <br />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  )
}

export default BlogForm
