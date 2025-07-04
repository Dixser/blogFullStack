//import BlogForm from './BlogForm'
import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const BlogSection = ({
  blogs,
  user,
  handleLogout,
  handleErrorMessageChange,
  removeBlog,
}) => {
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <>
      <div>
        <p>
          <strong>{user.username}</strong> logged in{' '}
          <button type='button' onClick={handleLogout}>
            logout
          </button>
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} user={user} />
        ))}
      </div>
    </>
  )
}
BlogSection.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleErrorMessageChange: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}
export default BlogSection
