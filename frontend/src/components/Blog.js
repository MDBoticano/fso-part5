import React from 'react'
const Blog = ({ blog }) => {

  const blogListHasAuthor = () => {
    if (blog.author) {
      return (
        <div>
          {blog.title} by {blog.author}
        </div>
      )
    } else {
      return (
        <div>
          {blog.title}
        </div>
      )
    }
  }

  return (
    <>
      {blogListHasAuthor()}
    </>
  )
}

export default Blog