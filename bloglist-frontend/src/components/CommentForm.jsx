import { useState } from 'react'

const CommentForm = ({ onCommentSubmit }) => {
    const [comment, setComment] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        if (comment.trim()) {
            onCommentSubmit(comment)
            setComment('')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={comment}
                onChange={({ target }) => setComment(target.value)}
                placeholder="Add a comment"
            />
            <button type="submit">add comment</button>
        </form>
    )
}

export default CommentForm