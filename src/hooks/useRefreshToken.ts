import { useState, useEffect } from 'react'
import { useAuthStore } from '.'
import { AuthStore } from '../store/AuthStore'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NProgress = require('nprogress')

type RefreshTokenHook = {
  loading: boolean
  authStore: AuthStore
}

export const useRefreshToken: () => RefreshTokenHook = () => {
  const [loading, setLoading] = useState(true)
  const authStore = useAuthStore()

  useEffect(() => {
    NProgress.start()
  }, [])

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

  // Maybe this can directly return the access token, but will have to mess with
  // mobx observables for that.
  return { loading, authStore }
}
