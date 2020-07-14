import { MockedProvider, MockedResponse } from '@apollo/react-testing'
import { render, waitFor } from '@testing-library/react'
import { loader } from 'graphql.macro'
import React from 'react'
import { SideBar } from '../SideBar'
import { MemoryRouter } from 'react-router-dom'

function createMockedResult(results: Array<any>): MockedResponse[] {
  const projectsQuery = loader('../../queries/projects.graphql')
  return [
    {
      request: {
        query: projectsQuery,
      },
      result: {
        data: {
          projects: results,
          inbox: {
            id: 1000000,
            name: 'Inbox',
          },
        },
      },
    },
  ]
}

describe('The sidebar', () => {
  it("Shows user's projects", async () => {
    const mocks = createMockedResult([
      { id: 1, name: 'myname', color: { hex: '000000' } },
      { id: 2, name: 'asdfgh', color: { hex: 'ffffff' } },
    ])
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SideBar />
        </MockedProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      const inbox = queryByText('inbox', { exact: false })
      expect(inbox).not.toBeNull()
      expect(inbox).toBeInTheDocument()

      const myname = queryByText('myname', { exact: false })
      expect(myname).not.toBeNull()
      expect(myname).toBeInTheDocument()

      const asdfgh = queryByText('asdfgh', { exact: false })
      expect(asdfgh).not.toBeNull()
      expect(asdfgh).toBeInTheDocument()
    })
  })

  it('Highlights the active project', async () => {
    const mocks = createMockedResult([
      { id: 1, name: 'myname', color: { hex: '000000' } },
      { id: 2, name: 'asdfgh', color: { hex: 'ffffff' } },
    ])
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/projects/2']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SideBar />
        </MockedProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      const inbox = queryByText('inbox', { exact: false })
      expect(inbox).not.toBeNull()
      expect(inbox).toBeInTheDocument()

      const myname = queryByText('myname', { exact: false })
      expect(myname).not.toBeNull()
      expect(myname).toBeInTheDocument()

      const asdfgh = queryByText('asdfgh', { exact: false })
      expect(asdfgh).not.toBeNull()
      expect(asdfgh).toBeInTheDocument()

      const projectContainer = asdfgh!.closest('a')
      expect(projectContainer).toHaveClass('active')
    })
  })

  it('Shows a button that creates projects', async () => {
    const mocks = createMockedResult([])
    const { getByText } = render(
      <MemoryRouter initialEntries={['/projects/2']}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SideBar />
        </MockedProvider>
      </MemoryRouter>
    )

    await waitFor(() => {
      const button = getByText('Add new project')
      expect(button).toBeInTheDocument()
    })
  })
})
