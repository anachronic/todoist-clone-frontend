import { ApolloProvider } from '@apollo/react-hooks'
import { Observer } from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactDom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { apolloClient } from './apollo'
import './assets/styles.css'
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
        <div className="flex flex-row">
          <Observer>
            {() => {
              if (!authStore.isAuthenticated) {
                return <></>
              }
              return (
                <div className="ml-5 mt-10 min-w-1/5 pr-10">
                  <SideBar />
                </div>
              )
            }}
          </Observer>
          <div className="container mx-auto mt-3">
            <Routes />
          </div>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  )
}
