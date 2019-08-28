import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogDetails = () => {
    return (
      <div className="blogDetails">
        <p className="blog-url">{blog.url}</p>
        <div className="blog-likes">
          <p className="num-likes">{blog.likes} likes</p>
          <button className="like-btn" onClick={handleLike}>Like</button>
        </div>
        <div className="blog-delete">
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
        {blogListHasUser()}
      </div>
    )
  }

  const blogListHasUser = () => {
    if (blog.user && blog.user.name) {
      return (
        <p className="blog-user">added by {blog.user.name}</p>
      )
    }
  }

  const blogHasAuthor = () => {
    if (blog.author) {
      return `by ${blog.author}`
    }
  }

  return (
    <div className="blog-entry">
      <div className="blog-summary" onClick={toggleDetails}>
        <p> {blog.title} {blogHasAuthor()}</p>
      </div>
      {detailsVisible && blogDetails()}
    </div>
  )
}

export default Blog