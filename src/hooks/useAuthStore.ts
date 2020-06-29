import React from 'react'
import { AuthStoreContext } from '../contexts/AuthStoreContext'
import { AuthStore } from '../store/AuthStore'

export const useAuthStore: () => AuthStore = () => {
  return React.useContext(AuthStoreContext)
}
