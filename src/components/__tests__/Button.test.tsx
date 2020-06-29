import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../Button'

describe('The button component', () => {
  it('Renders its children', () => {
    render(
      <Button data-testid="test-button">
        <span data-testid="span1">Hello </span>
        <span data-testid="span2">world!</span>
      </Button>
    )

    const span1 = screen.queryByTestId('span1')
    const span2 = screen.queryByTestId('span2')

    expect(span1).toBeInTheDocument()
    expect(span2).toBeInTheDocument()

    expect(document.body).toHaveTextContent(/Hello World/i)
  })

  it('Renders the type of the button', () => {
    render(<Button type="submit">Test</Button>)

    const button = document.querySelector('button')
    expect(button).toHaveProperty('type', 'submit')
  })

  it('Accepts onClick events', () => {
    const fn = jest.fn()
    const { getByText } = render(<Button onClick={fn}>Test</Button>)

    fireEvent.click(getByText('Test'))

    expect(fn).toHaveBeenCalled()
  })
})
