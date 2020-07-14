import { MockedProvider } from '@apollo/react-testing'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { loader } from 'graphql.macro'
import React from 'react'
import { ProjectNew } from '../ProjectNew'

describe('The ProjectNew component', () => {
  it('Shows a button if no action is taken', async () => {
    const { getByText } = render(
      <MockedProvider>
        <ProjectNew />
      </MockedProvider>
    )

    const addNew = getByText('Add new project')
    expect(addNew).toBeInTheDocument()
  })

  it('Shows and focuses an input if the add project button is clicked', async () => {
    const { getByText, queryByPlaceholderText } = render(
      <MockedProvider>
        <ProjectNew />
      </MockedProvider>
    )

    const button = getByText('Add new project')

    await waitFor(() => {
      fireEvent.click(button)
    })

    expect(button).not.toBeInTheDocument()

    const input = queryByPlaceholderText('Enter to create')
    expect(input).toBeInTheDocument()
    expect(input).toHaveFocus()
  })

  it('Hides the input when it blurs and shows the button', async () => {
    const { getByText, queryByPlaceholderText, queryByText } = render(
      <MockedProvider>
        <ProjectNew />
      </MockedProvider>
    )

    const button = getByText('Add new project')
    await waitFor(() => {
      fireEvent.click(button)
    })

    expect(button).not.toBeInTheDocument()

    const input = queryByPlaceholderText('Enter to create')
    expect(input).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.blur(input!)
    })

    expect(input).not.toBeInTheDocument()

    const newButton = queryByText('Add new project')
    expect(newButton).not.toBeNull()
    expect(newButton).toBeInTheDocument()
  })

  it('Validates emptiness of name', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <MockedProvider>
        <ProjectNew />
      </MockedProvider>
    )

    const button = getByText('Add new project')
    await waitFor(() => {
      fireEvent.click(button)
    })

    const input = getByPlaceholderText('Enter to create')
    await waitFor(() => {
      fireEvent.submit(input)
    })

    const error = queryByText('Required')
    expect(error).not.toBeNull()
    expect(error).toBeInTheDocument()
  })

  it('Fires the createProject query when input is valid', async () => {
    const mutation = loader('../../queries/createProject.graphql')

    const mocks = [
      {
        request: {
          query: mutation,
          variables: { name: 'something' },
        },
        result: {
          data: {
            createProject: {
              id: 1,
              name: 'something',
            },
          },
        },
      },
    ]
    const onProjectAdded = jest.fn()
    const { getByText, getByPlaceholderText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProjectNew onProjectAdded={onProjectAdded} />
      </MockedProvider>
    )

    await waitFor(() => {
      fireEvent.click(getByText('Add new project'))
    })

    const input = getByPlaceholderText('Enter to create')
    await waitFor(() => {
      fireEvent.change(input, { target: { value: 'something' } })
    })

    await waitFor(() => {
      fireEvent.submit(input)
    })

    await waitFor(() => {
      expect(onProjectAdded).toHaveBeenCalledWith({ id: 1, name: 'something' })
    })
  })
})
