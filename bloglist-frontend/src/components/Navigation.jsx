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
    <nav className='navBar'>
      <div className='navLinks'>
        <Link to="/">blogs</Link> <Link to="/users">users</Link>
      </div>
      {user ? (
        <div>
          <span>
            {' '}
            <strong>{user.username}</strong> logged in{' '}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </span>
        </div>
      ) : (
        <div>
          <span>
            {' '}
            <Link to="/login">login</Link>
          </span>
        </div>
      )}
    </nav>
  )
}

export default Navigation
