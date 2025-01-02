import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)
  const changeVisibility = () => {
    setVisible(!visible)
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
          likes {blog.likes} <button type="button">like</button>
        </p>
        <p>{blog.user.username}</p>
      </div>
    </div>
  )
}

export default Blog
