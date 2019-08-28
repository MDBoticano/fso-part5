import React from 'react'

import Blog from './Blog'

const Bloglist = ({ blogs, handleLike }) => {

  const blogsList = () => blogs.map((blog) => 
    <Blog key={blog.id} blog={blog} handleLike={handleLike}/>
  )

  return (
    <div id="bloglist">
      {blogsList()}
    </div>
  )
}

export default Bloglist