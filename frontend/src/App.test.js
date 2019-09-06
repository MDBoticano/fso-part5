import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    /* Waits for the login button to show */
    await waitForElement(
      () => component.container.querySelector('.toggleable--hide-btn')
      
      // Suggested check to wait for data to load
      // () => component.getByText('login')
    ) 

      // If there's no user logged in (default), Only display login form
      const loginForm = component.container.querySelector('#loginForm')
      expect(loginForm).not.toHaveStyle('display: none')

      // There should be zero blogs
      const blogs = component.container.querySelectorAll('.blog-entry')
      expect(blogs.length).toBe(0)

    
  })
})