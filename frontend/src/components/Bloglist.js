import React from 'react'

import Blog from './Blog'

const Bloglist = ({ blogs, handleLike, handleDelete }) => {

  const blogsList = () => blogs.map((blog) => 
    <Blog 
      key={blog.id} 
      blog={blog} 
      handleLike={() => handleLike(blog)}
      handleDelete={() => handleDelete(blog)}
    />
  )

  return (
    <div id="bloglist">
      {blogsList()}
    </div>
  )
}

export default Bloglist