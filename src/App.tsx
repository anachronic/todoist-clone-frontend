import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import { Observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './assets/styles.css'
import { TopBar } from './components/TopBar'
import { useAuthStore } from './hooks/useAuthStore'
import { Routes } from './Routes'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NProgress = require('nprogress')

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
  const authStore = useAuthStore()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!loading || authStore.isAuthenticated) {
      return
    }

    fetch('http://localhost:4000/sessions/refresh-token', {
      method: 'POST',
      credentials: 'include',
    })
      .then((data) => data.json())
      .then(({ accessToken }) => {
        if (accessToken) {
          authStore.authenticate(accessToken)
        }
      })
      .finally(() => {
        NProgress.done()
        setLoading(false)
      })
  }, [loading, authStore])

  if (loading) {
    NProgress.start()

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
