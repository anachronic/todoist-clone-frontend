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

  it('Merges className into original classes', () => {
    render(<Button className="my-class">Hola</Button>)

    function selector(
      query: string
    ): ReturnType<typeof document.body.querySelector> {
      return document.body.querySelector(query)
    }

    expect(selector('.my-class')).not.toBeNull()
  })

  it('Accepts variant', async () => {
    render(<Button variant="warning">some text</Button>)

    const button = document.querySelector('.warning')
    expect(button).not.toBeNull()
  })

  it('Can be outlined', async () => {
    render(<Button slim>some text</Button>)

    const button = document.querySelector('.slim')
    expect(button).not.toBeNull()
  })

  it('Defaults variant to primery', async () => {
    render(<Button>some text</Button>)

    const button = document.querySelector('.primary')
    expect(button).not.toBeNull()
  })

  it('Defults type to button', async () => {
    render(<Button>some text</Button>)

    const button = document.querySelector('.primary')
    expect(button?.getAttribute('type')).toEqual('button')
  })

  it('Can be a submit button', async () => {
    render(<Button type="submit">some text</Button>)

    const button = document.querySelector('.primary')
    expect(button?.getAttribute('type')).toEqual('submit')
  })
})
