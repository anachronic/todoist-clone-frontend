import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { Query } from '../components/Query'

const query = loader('../queries/me.graphql')

const Home: React.FC = () => {
  const queryResult = useQuery(query)
  return (
    <Query query={queryResult} isEmptyFn={() => false}>
      {(data) => <div>{JSON.stringify(data)}</div>}
    </Query>
  )
}

export default Home
