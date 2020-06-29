import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './assets/styles.css'
import { TopBar } from './components/TopBar'
import { useAuthStore } from './hooks/useAuthStore'
import { Routes } from './Routes'

function createClient(token: string | null): ApolloClient<unknown> {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  })
}

export const App: React.FC = () => {
  const authStore = useAuthStore()

  return useObserver(() => (
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
  ))
}
