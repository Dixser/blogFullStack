import Blog from './Blog'
import PropTypes from 'prop-types'
const BlogSection = ({ blogs }) => {
  blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
BlogSection.propTypes = {
  blogs: PropTypes.array.isRequired,
}
export default BlogSection
