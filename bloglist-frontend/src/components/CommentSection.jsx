import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../contexts/NotificationContext'
import { useUser } from '../contexts/UserContext'
import blogService from '../services/blogs'
import CommentForm from './CommentForm'
const CommentSection = ({ blog }) => {
    const { user } = useUser()
    const [, setNotification] = useNotification()
    const queryClient = useQueryClient()
    const commentMutation = useMutation({
        mutationFn: (comment) => blogService.createComment(blog.id, comment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs', blog.id] })
            setNotification('Comment added!', 5)
        },
    })
    return (
        <div>
            <h3>comments</h3>
            <CommentForm onCommentSubmit={(comment) => commentMutation.mutate(comment)} />
            {blog.comments.length === 0 ? (
                <p>No comments yet</p>
            ) : (
                <ul>
                    {blog.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CommentSection
