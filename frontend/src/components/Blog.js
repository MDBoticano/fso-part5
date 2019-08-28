import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogDetails = () => {
    return (
      <div className="blogDetails">
        <p className="blog-url">{blog.url}</p>
        <p className="blog-likes">{blog.likes} likes</p>
        <button className="like-btn" onClick={handleLike}>Like</button>
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

  const blogListHasAuthor = () => {
    if (blog.author) {
      return <div className="blog-title">{blog.title} by {blog.author}</div>
    } else {
      return <div className="blog-title">{blog.title}</div>
    }
  }

  return (
    <div className="blog-entry">
      <button className="detailsToggle" onClick={toggleDetails}>
        {blogListHasAuthor()}
      </button>
      {detailsVisible && blogDetails()}
    </div>
  )
}

export default Blog