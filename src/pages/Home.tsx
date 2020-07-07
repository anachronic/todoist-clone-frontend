import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { Query } from '../components/Query'
import { useToast } from '../hooks/useToast'

const query = loader('../queries/me.graphql')

const Home: React.FC = () => {
  const queryResult = useQuery(query)
  const startToast = useToast()

  return (
    <>
      {/* <Toast /> */}
      <button
        onClick={() =>
          startToast({ text: 'mi super toast', position: 'bottomCenter' })
        }
      >
        show toast
      </button>
      <Query query={queryResult} isEmptyFn={() => false}>
        {(data) => <div>{JSON.stringify(data)}</div>}
      </Query>
    </>
  )
}

export default Home
