import { useEffect, useState } from 'react'
import { authStore } from '../store/AuthStore'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const NProgress = require('nprogress')

type RefreshTokenHook = {
  loading: boolean
}

export const useRefreshToken: () => RefreshTokenHook = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    NProgress.start()
  }, [])

  useEffect(() => {
    if (!loading || authStore.isAuthenticated) {
      return
    }

    authStore.requestNewAccessToken().finally(() => {
      NProgress.done()
      setLoading(false)
    })
  }, [loading])

  return { loading }
}
