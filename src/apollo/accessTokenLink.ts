import { setContext } from 'apollo-link-context'
import { authStore } from '../store/AuthStore'

export const accessTokenLink = setContext(() => ({
  headers: {
    Authorization: `Bearer ${authStore.token}`,
  },
}))
