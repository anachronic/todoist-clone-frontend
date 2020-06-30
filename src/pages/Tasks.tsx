import React from 'react'
import { TaskList } from '../components/TaskList'
import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/react-hooks'
import { Query } from '../components/Query'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const query = loader('../queries/tasks.graphql')

const Tasks: React.FC = () => {
  const queryResult = useQuery(query)

  return (
    <Query
      query={queryResult}
      isEmptyFn={(data) =>
        !Array.isArray(data.tasks) || data.tasks.length === 0
      }
    >
      {(data) => <TaskList tasks={data.tasks} />}
    </Query>
  )
}

export default Tasks
