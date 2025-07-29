import Blog from './Blog'
import PropTypes from 'prop-types'
import { useUser } from '../contexts/UserContext'
const BlogSection = ({
  blogs
}) => {
  blogs.sort((a, b) => b.likes - a.likes)
  const { user, logout } = useUser()
  const handleLogout = () => {
    logout()
    window.localStorage.removeItem('loggedBlogappUser')
  }
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
          <Blog key={blog.id} blog={blog}/>
        ))}
      </div>
    </>
  )
}
BlogSection.propTypes = {
  blogs: PropTypes.array.isRequired,
}
export default BlogSection
