import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { useUser } from '../contexts/UserContext'
import { useNotification } from '../contexts/NotificationContext'
import CommentSection from './CommentSection'

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useUser()
  const [, setNotification] = useNotification()

  const result = useQuery({
    queryKey: ['blogs', id],
    queryFn: () => blogService.getById(id),
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification('Blog voted!', 5)
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setNotification('Blog deleted!', 5)
      navigate('/')
    },
  })

  if (result.isLoading) return <div>Loading...</div>
  if (result.isError) return <div>Error loading blog</div>

  const blog = result.data

  const handleLike = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      removeBlogMutation.mutate(blog.id)
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{' '}
        <button type="button" onClick={handleLike}>
          like
        </button>
      </p>
      <p>added by {blog.user ? blog.user.name || blog.user.username : 'unknown'}</p>
      {blog.user && blog.user.username === user.username && (
        <button type="button" onClick={handleDelete}>
          delete
        </button>
      )}
      <CommentSection blog={blog} />
    </div>
  )
}

export default BlogDetail
