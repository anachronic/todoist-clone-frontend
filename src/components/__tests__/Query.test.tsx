import { render } from '@testing-library/react'
import React from 'react'
import { Query } from '../Query'
import { MemoryRouter, Route } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NProgress = require('nprogress')

type MockedQuery = Record<string, any>

jest.mock('nprogress')

describe('The Query component', () => {
  beforeEach(() => {
    if (jest.isMockFunction(NProgress.done)) {
      NProgress.done.mockRestore()
    }

    if (jest.isMockFunction(NProgress.start)) {
      NProgress.start.mockRestore()
    }
  })

  it('Shows loading as long as the query is loading', async () => {
    const mockedQuery = {
      loading: true,
      data: null,
      error: null,
    }

    render(<Query query={mockedQuery}>{() => <div>Never</div>}</Query>)

    expect(NProgress.start).toHaveBeenCalled()
  })

  it('Does not show children if query is loading or has an error', async () => {
    const mockedQuery: MockedQuery = {
      loading: true,
      data: null,
      error: null,
    }

    const { queryByText, rerender } = render(
      <Query query={mockedQuery}>{() => <div>Never</div>}</Query>
    )

    const never = queryByText('Never')
    expect(never).toBeNull()
    expect(NProgress.start).toHaveBeenCalled()
    expect(NProgress.done).not.toHaveBeenCalled()

    mockedQuery.loading = false
    mockedQuery.error = true

    rerender(<Query query={mockedQuery}>{() => <div>Never</div>}</Query>)

    const errorNever = queryByText('Never')
    expect(errorNever).toBeNull()
    expect(NProgress.done).toHaveBeenCalled()

    const errorText = queryByText('Errored')
    expect(errorText).toBeInTheDocument()
  })

  it('Shows children when query stops loading', async () => {
    const mockedQuery: MockedQuery = {
      loading: true,
      data: null,
      error: null,
    }

    const { getByText, rerender } = render(
      <Query query={mockedQuery}>{() => <div>Yey!</div>}</Query>
    )

    rerender(
      <Query query={{ ...mockedQuery, loading: false }}>
        {() => <div>Yey!</div>}
      </Query>
    )

    const yey = getByText('Yey!')
    expect(NProgress.done).toHaveBeenCalled()
    expect(yey).toBeInTheDocument()
  })

  it('Displays "Nothing to show here" if there is no data', async () => {
    const mockedQuery: MockedQuery = {
      loading: false,
      data: 'some data',
      error: null,
    }

    const isEmpty = jest.fn(() => true)
    const { queryByText, getByText } = render(
      <Query query={mockedQuery} isEmptyFn={isEmpty}>
        {() => <div>Yey!</div>}
      </Query>
    )

    const yey = queryByText('Yey!')
    expect(yey).toBeNull()
    expect(isEmpty).toHaveBeenCalled()

    const emptyText = getByText('Nothing to show here')
    expect(emptyText).toBeInTheDocument()
  })

  it('Renders the empty render prop if passed', async () => {
    const mockedQuery: MockedQuery = {
      loading: false,
      data: 'some data',
      error: null,
    }

    const isEmpty = jest.fn(() => true)
    const { getByText } = render(
      <Query
        query={mockedQuery}
        isEmptyFn={isEmpty}
        emptyRender={<div>show me</div>}
      >
        {(data, empty) => (
          <div>
            {data}
            <div>also show me</div>
            {empty}
          </div>
        )}
      </Query>
    )

    const showMe = getByText('show me')
    expect(showMe).toBeInTheDocument()

    const alsoShowMe = getByText('also show me')
    expect(alsoShowMe).toBeInTheDocument()

    const theData = getByText('some data')
    expect(theData).toBeInTheDocument()
  })

  it('Redirects to login if request is not authenticated', async () => {
    const mockedQuery: MockedQuery = {
      loading: false,
      data: null,
      error: { message: 'not authenticated' },
    }

    const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={['/some-path']}>
        <Route exact path="/some-path">
          <Query query={mockedQuery}>
            {() => (
              <div>
                <div>Do NOT show me</div>
              </div>
            )}
          </Query>
        </Route>

        <Route exact path="/login">
          <div>Login page</div>
        </Route>
      </MemoryRouter>
    )

    const loginPage = getByText('Login page')
    expect(loginPage).toBeInTheDocument()

    const dontShowMe = queryByText('Do NOT show me')
    expect(dontShowMe).toBeNull()
  })
})
