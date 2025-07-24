import { useEffect, useState } from 'react'
import { create } from '../services/blogs'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
const BlogForm = ({ handleErrorMessageChange }) => {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      setTitle('')
      setAuthor('')
      setUrl('')
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      handleErrorMessageChange('Blog added!')
    },
    onError: (error) => {
      handleErrorMessageChange(error.response.data.error)
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
        type='text'
        value={title}
        id='title'
        data-testid='title'
        onChange={handleTitleChange}
      />
      <br />
      Author:
      <input
        type='text'
        value={author}
        id='author'
        data-testid='author'
        onChange={handleAuthorChange}
      />
      <br />
      URL:
      <input
        type='text'
        value={url}
        id='url'
        data-testid='url'
        onChange={handleUrlChange}
      />
      <br />
      <button type='submit'>Create Blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleErrorMessageChange: PropTypes.func.isRequired,
}
export default BlogForm
