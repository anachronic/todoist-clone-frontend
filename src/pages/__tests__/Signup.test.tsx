import { MockedProvider } from '@apollo/react-testing'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { loader } from 'graphql.macro'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter, Route } from 'react-router-dom'
import Signup from '../Signup'

describe('The Signup View', () => {
  it('Renders a signup form', async () => {
    const { getByPlaceholderText } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    )

    const email = getByPlaceholderText('email', { exact: false })
    expect(email).toBeInTheDocument()

    const name = getByPlaceholderText('name', { exact: false })
    expect(name).toBeInTheDocument()

    const password = getByPlaceholderText('password')
    expect(password).toBeInTheDocument()

    const passwordConfirmation = getByPlaceholderText('confirm password')
    expect(passwordConfirmation).toBeInTheDocument()
  })

  it('Validates email for user', async () => {
    const { queryByText, getByPlaceholderText } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    )

    const emailInput = getByPlaceholderText('email')
    await waitFor(() => {
      fireEvent.change(emailInput, { target: { value: 'asd' } })
    })

    await waitFor(() => {
      fireEvent.blur(emailInput)
    })

    const error = queryByText('Enter a valid email')
    expect(error).not.toBeNull()
    expect(error).toBeInTheDocument()
  })

  it('Validates requirement of name', async () => {
    const { queryByText, getByPlaceholderText } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    )

    await waitFor(() => {
      const nameInput = getByPlaceholderText('name')
      fireEvent.blur(nameInput)
    })

    const error = queryByText('Required')
    expect(error).not.toBeNull()
    expect(error).toBeInTheDocument()
  })

  it('Validates requirement of password and minimum length of 6', async () => {
    const { queryByText, getByPlaceholderText } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    )

    const passwordInput = getByPlaceholderText('password')
    await waitFor(() => {
      fireEvent.blur(passwordInput)
    })

    const requiredError = queryByText('Required')
    expect(requiredError).not.toBeNull()
    expect(requiredError).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.change(passwordInput, { target: { value: 'wow' } })
    })

    await waitFor(() => {
      fireEvent.blur(passwordInput)
    })

    const lengthError = queryByText('At least 6 characters')
    expect(lengthError).not.toBeNull()
    expect(lengthError).toBeInTheDocument()
  })

  it('Validates requirement of password confirmation and requires that it be equal to the password', async () => {
    const { queryByText, getByPlaceholderText } = render(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    )

    const passwordConfirmationInput = getByPlaceholderText('confirm password')
    const passwordInput = getByPlaceholderText('password')
    await waitFor(() => {
      fireEvent.blur(passwordConfirmationInput)
    })

    const requiredError = queryByText('Required')
    expect(requiredError).not.toBeNull()
    expect(requiredError).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.change(passwordInput, { target: { value: 'goodpassword' } })
      fireEvent.change(passwordConfirmationInput, {
        target: { value: 'badpassword' },
      })
    })

    await waitFor(() => {
      fireEvent.blur(passwordConfirmationInput)
    })

    const matchError = queryByText('Passwords must match')
    expect(matchError).not.toBeNull()
    expect(matchError).toBeInTheDocument()
  })

  it('Sends the mutation to the backend on submit and valid data', async () => {
    const registerMutation = loader('../../queries/register.graphql')

    const mocks = [
      {
        request: {
          query: registerMutation,
          variables: {
            name: 'john doe',
            email: 'john@doe.com',
            password: 'wowowow',
            passwordConfirmation: 'wowowow',
          },
        },
        result: {
          data: {
            registerUser: {
              id: 1,
              name: 'john doe',
              email: 'john@doe.com',
            },
          },
        },
      },
    ]

    const { queryByText, getByText, getByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/signup']}>
          <Route path="/login">
            <div>Login</div>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    )

    const nameInput = getByPlaceholderText('name')
    const emailInput = getByPlaceholderText('email')
    const passwordInput = getByPlaceholderText('password')
    const passwordConfirmationInput = getByPlaceholderText('confirm password')

    await waitFor(() => {
      fireEvent.change(nameInput, { target: { value: 'john doe' } })
      fireEvent.change(emailInput, { target: { value: 'john@doe.com' } })
      fireEvent.change(passwordInput, { target: { value: 'wowowow' } })
      fireEvent.change(passwordConfirmationInput, {
        target: { value: 'wowowow' },
      })
    })

    // waitFor seems to make the tests hang here, so act should be fine for now
    await act(async () => {
      const submit = getByText('Sign up')
      fireEvent.click(submit)

      // Resolve the graphql promise. This will flush promises and will cause
      // the router to fire
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    await waitFor(() => {
      const login = queryByText('Login')
      expect(login).not.toBeNull()
      expect(login).toBeInTheDocument

      expect(nameInput).not.toBeInTheDocument()
      expect(passwordConfirmationInput).not.toBeInTheDocument()
      expect(passwordInput).not.toBeInTheDocument()
      expect(nameInput).not.toBeInTheDocument()
    })
  })
})
