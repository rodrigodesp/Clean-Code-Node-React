import { render } from '@testing-library/react'
import React from 'react'
import Login from './login'

describe('Login Component', () => {
  test('Validate if the spinner and errorMessage component is not displayed when entering the page ', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)
  })
})
