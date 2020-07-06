import { HttpLink } from 'apollo-link-http'

export const endpointLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
})
