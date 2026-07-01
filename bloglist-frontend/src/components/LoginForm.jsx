import { useUser } from '../contexts/UserContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
  const { login } = useUser()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await login(username, password)
      navigate('/')
    } catch {
      // login error is handled by UserContext notification
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="Username"
            autoComplete="username"
            data-testid="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            data-testid="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
