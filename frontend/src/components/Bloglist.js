import React from 'react'

import Blog from './Blog'

const Bloglist = ({ blogs }) => {

  const blogsList = () => blogs.map(
    blog => <Blog blog={blog} />
  )

  return (
    <>
      {blogsList()}
    </>
  )
}

export default Bloglist