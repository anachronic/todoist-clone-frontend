import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { Toast } from '../Toast'

describe('The Toast component', () => {
  it('Shows the the text passed to it', async () => {
    const { getByText } = render(<Toast text="show me" />)

    const text = getByText('show me')
    expect(text).toBeInTheDocument()
  })

  it('Changes to unmount class after the timeout has passed', async () => {
    jest.useFakeTimers()
    const { getByText } = render(<Toast text="some text" timeout={100} />)

    let toast = getByText('some text')
    expect(toast).toBeInTheDocument()
    expect(toast).not.toHaveClass('unmounting')
    expect(toast).toHaveClass('mounting')

    await waitFor(() => {
      jest.advanceTimersByTime(102)
    })
    toast = getByText('some text')

    expect(toast).toHaveClass('unmounting')
    expect(toast).not.toHaveClass('mounting')
  })
})
