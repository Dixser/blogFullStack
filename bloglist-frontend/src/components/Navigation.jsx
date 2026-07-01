import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

const Navigation = () => {
  const { user, logout } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    window.localStorage.removeItem('loggedBlogappUser')
    navigate('/login')
  }

  return (
    <nav>
      <Link to="/">blogs</Link> <Link to="/users">users</Link>
      {user ? (
        <span>
          {' '}
          <strong>{user.username}</strong> logged in{' '}
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </span>
      ) : (
        <span>
          {' '}
          <Link to="/login">login</Link>
        </span>
      )}
    </nav>
  )
}

export default Navigation
