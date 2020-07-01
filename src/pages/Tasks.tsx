import { useMutation, useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { Query } from '../components/Query'
import { TaskList } from '../components/TaskList'
import { TaskNew } from '../components/TaskNew'
import { Task } from '../types/Task'

const tasksQuery = loader('../queries/tasks.graphql')
const completeTaskMutation = loader('../queries/completeTask.graphql')

const Tasks: React.FC = () => {
  const queryResult = useQuery<Task[], { done: boolean }>(tasksQuery, {
    variables: {
      done: false,
    },
  })
  const [completeTask] = useMutation(completeTaskMutation)

  const onCompleteTask = (task: any) => {
    completeTask({
      variables: {
        id: +task.id,
      },
    }).then(() => {
      queryResult.refetch()
    })
  }

  return (
    <Query
      query={queryResult}
      isEmptyFn={(data) =>
        !Array.isArray(data.tasks) || data.tasks.length === 0
      }
    >
      {(data) => (
        <div>
          <TaskList tasks={data.tasks} onCompleteTask={onCompleteTask} />
          <div>
            <TaskNew onTaskAdded={() => queryResult.refetch()} />
          </div>
        </div>
      )}
    </Query>
  )
}

export default Tasks
