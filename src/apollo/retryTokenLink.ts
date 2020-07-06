import { Observable } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { authStore } from '../store/AuthStore'

export const retryTokenLink = onError(
  ({ graphQLErrors, operation, forward }) => {
    if (!graphQLErrors) {
      return
    }

    const notAuthError = graphQLErrors.find(
      (err) => (err as any)?.extensions?.exception?.name === 'NotAuthenticated'
    )

    if (!notAuthError) {
      return
    }

    return new Observable((observer) => {
      authStore
        .requestNewAccessToken()
        .then(() => {
          const {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            Authorization: _,
            ...oldHeaders
          } = operation.getContext().headers
          operation.setContext({
            headers: {
              ...oldHeaders,
              Authorization: `Bearer ${authStore.token}`,
            },
          })
        })
        .then(() => {
          const subscriber = {
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          }

          forward(operation).subscribe(subscriber)
        })
    })
  }
)
