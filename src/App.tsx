import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { Observer } from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactDom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './assets/styles.css'
import { TopBar } from './components/TopBar'
import { useRefreshToken } from './hooks/useRefreshToken'
import { Routes } from './Routes'

function createClient(token: string | null): ApolloClient<unknown> {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })
}

export const App: React.FC = () => {
  const { loading, authStore } = useRefreshToken()

  if (loading) {
    return <></>
  }

  return (
    <Observer>
      {() => (
        <ApolloProvider client={createClient(authStore.token)}>
          <BrowserRouter>
            <div>
              <TopBar />
              <div className="container mx-auto mt-3">
                <Routes />
              </div>
            </div>
          </BrowserRouter>
        </ApolloProvider>
      )}
    </Observer>
  )
}
