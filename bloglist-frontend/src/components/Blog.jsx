import { useState } from 'react'
import { update, remove } from '../services/blogs'
import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useUser } from '../contexts/UserContext'
import { useNotification } from '../contexts/NotificationContext'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const queryClient = useQueryClient()
  const [notification, setNotification] = useNotification()
  const changeVisibility = () => {
    setVisible(!visible)
  }

  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification('Blog voted!', 5)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const removeBlogMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification('Blog deleted!', 5)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleClick = async () => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    updateBlogMutation.mutate(newBlog)
  }
  const handleDelete = () => {
    if (
      window.confirm('Are you sure you want to delete "' + blog.title + '"?')
    ) {
      removeBlogMutation.mutate(blog.id)
    }
  }
  const { user } = useUser()
  const display = { display: visible ? '' : 'none' }
  return (
    <div style={blogStyle}>
      <div className='mainContent'>
        <h3>{blog.title}</h3>
        <em>
          by {blog.author}{' '}
          <button type='button' onClick={changeVisibility}>
            {visible ? 'Hide' : 'View more'}
          </button>
        </em>
      </div>
      <div style={display} className='hiddenContent'>
        <p>{blog.url}</p>
        <p>
          likes{' '}
          <em data-testid='likes' className='likes'>
            {blog.likes}
          </em>{' '}
          <button type='button' onClick={handleClick}>
            like
          </button>
        </p>
        {blog.user.username && <p>{blog.user.username}</p>}
        <p>
          {blog.user.username === user.username && (
            <button type='button' onClick={handleDelete}>
              Delete blog
            </button>
          )}
        </p>
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}
export default Blog
