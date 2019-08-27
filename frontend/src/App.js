import React, {useState, useEffect } from 'react';

import Notification from './components/Notification'
import Bloglist from './components/Bloglist'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  /* State values */
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
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
      window.localStorage.setItem( 'loggedBlogUser', JSON.stringify(user) )
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
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const loginForm = () => (
    <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
            <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
            <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </>
  )

  const blogsView = () => {
    return (
      <>
      <h1>Blogs</h1>
      <p>{user.name} is logged in</p>
      <button id="logout" onClick={handleLogout}>logout</button>
      <Bloglist blogs={blogs}/>

      </>
    )
  }
  

  return (
    <div className="App">
      <Notification message={errorMessage} />

      { user === null && loginForm()}
      { user !== null && blogsView()}


    </div>
  )
}

export default App
