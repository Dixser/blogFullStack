import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog }) => {
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
    if (window.confirm) {
      await blogService.remove(blog.id)
      removeBlog(blog)
    }
  }

  const display = { display: visible ? '' : 'none' }
  return (
    <div style={blogStyle}>
      <h3>{blog.title}</h3>
      <em>
        by {blog.author}{' '}
        <button type="button" onClick={changeVisibility}>
          {visible ? 'Hide' : 'View more'}
        </button>
      </em>
      <div style={display}>
        <p>{blog.url}</p>
        <p>
          likes {likes}{' '}
          <button type="button" onClick={handleClick}>
            like
          </button>
        </p>
        <p>{blog.user.username}</p>
        <p>
          <button type="button" onClick={handleDelete}>
            Delete blog
          </button>
        </p>
      </div>
    </div>
  )
}

export default Blog
