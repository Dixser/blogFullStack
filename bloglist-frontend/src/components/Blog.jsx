import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
const Blog = ({ blog, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const changeVisibility = () => {
    setVisible(!visible)
  }
  const handleClick = async (event) => {
    setLikes(++blog.likes)
    const updatedBlog = blog
    await blogService.update(updatedBlog.id, updatedBlog)
  }
  const handleDelete = async (event) => {
    if (
      window.confirm('Are you sure you want to delete "' + blog.title + '"?')
    ) {
      await blogService.remove(blog.id)
      removeBlog(blog)
    }
  }

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
          likes <em data-testid='likes' className='likes'>{likes}</em>{' '}
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
  removeBlog: PropTypes.func.isRequired,
}
export default Blog
