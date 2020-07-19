import { MockedProvider } from '@apollo/react-testing'
import { fireEvent, render, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Login from '../Login'

describe('The Login page', () => {
  describe('Logging in', () => {
    it('Validates that email and password are required', async () => {
      const { getByText, queryByText } = render(
        <MemoryRouter>
          <MockedProvider>
            <Login />
          </MockedProvider>
        </MemoryRouter>
      )

      const submit = getByText('Login')
      await waitFor(() => {
        fireEvent.submit(submit)
      })

      const enterValidEmail = queryByText('Email is required')
      const passwordRequired = queryByText('Enter a password')

      expect(passwordRequired).not.toBeNull()
      expect(enterValidEmail).not.toBeNull()

      expect(passwordRequired).toBeInTheDocument()
      expect(enterValidEmail).toBeInTheDocument()
    })

    it('Validates that email is an actual email', async () => {
      const { getByPlaceholderText, queryByText } = render(
        <MockedProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </MockedProvider>
      )

      const email = getByPlaceholderText('email')

      await waitFor(() => {
        fireEvent.change(email, { target: { value: 'asdf' } })
      })

      await waitFor(() => {
        fireEvent.blur(email)
      })

      const enterValidEmail = queryByText('Enter a valid email')
      expect(enterValidEmail).not.toBeNull()
      expect(enterValidEmail).toBeInTheDocument()
    })
  })
})
