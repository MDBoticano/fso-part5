import React, { useState, useEffect } from 'react';

import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Bloglist from './components/Bloglist'
import CreateBlog from './components/CreateBlog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  /* State values */
  const [blogs, setBlogs] = useState([])

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // eslint-disable-next-line
  const [user, setUser] = useState(null)

  /* useEffect hooks */
  // Get the blogs from the server
  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  // Check for logged in user
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      userId: user.userId
    }

    try { 
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))

      if (newAuthor) {
        setSuccessMessage(`Added blog ${newTitle} by ${newAuthor}`)
      } else {
        setSuccessMessage(`Added blog ${newTitle}`)
      }
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (error) {
      setErrorMessage('Failed to add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  /* 5.7: send PUT request to update blog */
  const handleLike = async (blog) => {
    const blogId = blog.id

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blogId
    }

    try { 
      const updatedBlog = await blogService.update(blogId, blogObject)
      setBlogs(blogs.map(entry => {
        if (entry.id !== blogId) {
          return entry
        } else {
          return updatedBlog
        }
      }))
    } catch (error) { 
      setErrorMessage('Failed to like blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  const handleTitle = ({ target }) => {
    setNewTitle(target.value)
  }

  const handleAuthor = ({ target }) => {
    setNewAuthor(target.value)
  }

  const handleUrl = ({ target }) => {
    setNewUrl(target.value)
  }

  const loginForm = () => (
    <Toggleable buttonLabel="login">
      <LoginForm
        username={username} handleUsername={handleUsername}
        password={password} handlePassword={handlePassword}
        handleLogin={handleLogin}
      />
    </Toggleable>
  )

  const blogFormRef = React.createRef()

  const blogsView = () => {
    return (
      <>
        <p className="logged-user">{user.name} is logged in</p>
        <button id="logout" onClick={handleLogout}>logout</button>
        <div id="blog-create-toggleable">
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <CreateBlog
              addBlog={addBlog}
              handleTitle={handleTitle} title={newTitle}
              handleAuthor={handleAuthor} author={newAuthor}
              handleUrl={handleUrl} url={newUrl}
            />
          </Toggleable>
        </div>
        <Bloglist blogs={blogs} handleLike={handleLike} />
      </>
    )
  }

  return (
    <div className="App">
      <h1 id="page-title">Blogs</h1>
      <Notification message={errorMessage} messageType='error' />
      <Notification message={successMessage} messageType='success' />
      {user === null && loginForm()}
      {user !== null && blogsView()}
    </div>
  )
}

export default App
