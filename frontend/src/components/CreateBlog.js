import React from 'react'

const CreateBlog = ({addBlog, author, handleAuthor, title, handleTitle, 
  url, handleUrl }) => {

  return (
    <form id="create-blog" onSubmit={addBlog}>
      <h2>Add blog</h2>
      <label htmlFor="title">Title</label>
      <input value={title} onChange={handleTitle} />
      <label htmlFor="author">Author</label>
      <input value={author} onChange={handleAuthor} />
      <label htmlFor="url">URL</label>
      <input value={url} onChange={handleUrl} />
      <button type='submit'>Add</button>
    </form>
  )
}

export default CreateBlog