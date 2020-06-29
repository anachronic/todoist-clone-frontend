import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import React from 'react'
// import { useAuthStore } from '../hooks/useAuthStore'

const query = loader('../queries/me.graphql')

const Home: React.FC = () => {
  const { loading, error, data } = useQuery(query)
  // const { isAuthenticated } = useAuthStore()

  if (error) {
    return <div>Failed {JSON.stringify(error)}</div>
  } else if (loading) {
    return <div>loading...</div>
  } else if (data) {
    return <div>{JSON.stringify(data)}</div>
  } else {
    return <div>Dunno wtf happened</div>
  }
}

export default Home
