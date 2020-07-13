import { render } from '@testing-library/react'
import React from 'react'
import { LazyLoad } from '../LazyLoad'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NProgress = require('nprogress')

jest.mock('nprogress')

describe('The LazyLoad component', () => {
  it('Starts nprogress when mounted and stops it when unmounted', async () => {
    NProgress.start = jest.fn()
    NProgress.done = jest.fn()
    const { unmount } = render(<LazyLoad />)

    expect(NProgress.start).toHaveBeenCalled()
    unmount()

    expect(NProgress.done).toHaveBeenCalled()
  })
})
