import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import usersService from '../services/users'

const UserProfile = () => {
  const { id } = useParams()

  const result = useQuery({
    queryKey: ['users', id],
    queryFn: () => usersService.getById(id),
  })

  if (result.isLoading) return <div>Loading...</div>
  if (result.isError) return <div>Error loading user</div>

  const user = result.data

  return (
    <div>
      <h2>{user.name || user.username}</h2>
      <h3>added blogs</h3>
      {user.blogs.length === 0 ? (
        <p>No blogs added yet</p>
      ) : (
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UserProfile
