import React from 'react'
import { AuthStoreContext } from '../contexts/AuthStoreContext'
import { AuthStore } from '../store/AuthStore'

type AuthStoreContext = () => AuthStore

export const useAuthStore: AuthStoreContext = () => {
  return React.useContext(AuthStoreContext)
}
