import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { accessTokenLink } from './accessTokenLink'
import { endpointLink } from './endpointLink'
import { retryTokenLink } from './retryTokenLink'

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([accessTokenLink, retryTokenLink, endpointLink]),
  cache: new InMemoryCache(),
})
