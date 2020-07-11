import { ApolloProvider } from '@apollo/react-hooks'
import { Observer } from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactDom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { apolloClient } from './apollo'
import './assets/styles.scss'
import { SideBar } from './components/SideBar'
import { TopBar } from './components/TopBar'
import { useAuthStore } from './hooks'
import { useRefreshToken } from './hooks/useRefreshToken'
import { Routes } from './Routes'

export const App: React.FC = () => {
  const { loading } = useRefreshToken()
  const authStore = useAuthStore()

  if (loading) {
    return <></>
  }

  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <div>
          <TopBar className="shadow-xl" />
        </div>
        <div className="row">
          <Observer>
            {() => (authStore.isAuthenticated ? <SideBar /> : <></>)}
          </Observer>
          <div className="container mt3">
            <Routes />
          </div>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
}
