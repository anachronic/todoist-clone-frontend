import { useMutation, useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { Query } from '../components/Query'
import { TaskList } from '../components/TaskList'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const tasksQuery = loader('../queries/tasks.graphql')
const completeTaskMutation = loader('../queries/completeTask.graphql')

const Tasks: React.FC = () => {
  const queryResult = useQuery(tasksQuery, {
    variables: {
      done: false,
    },
  })
  const [completeTask] = useMutation(completeTaskMutation)

  return (
    <Query
      query={queryResult}
      isEmptyFn={(data) =>
        !Array.isArray(data.tasks) || data.tasks.length === 0
      }
    >
      {(data) => (
        <TaskList
          tasks={data.tasks}
          onCompleteTask={(task) => {
            completeTask({
              variables: {
                id: +task.id,
              },
            })
          }}
        />
      )}
    </Query>
  )
}

export default Tasks
