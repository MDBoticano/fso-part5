import React from 'react'
import { render } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'My Blog Title',
    author: 'Mun Row',
    likes: 100,
  }

  const component = render(<SimpleBlog blog={blog} />)

  /* Title test */
  expect(component.container).toHaveTextContent('My Blog Title')

  expect(component.container).toHaveTextContent('Mun Row')

  expect(component.container).toHaveTextContent('blog has 100 likes')
})

