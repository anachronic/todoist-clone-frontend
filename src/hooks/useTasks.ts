import { useMutation, useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import { Task } from '../types/Task'
import { TaskCreateInput } from '../types/TaskCreateInput'
import { TaskFilter } from '../types/TaskFilter'

const tasksQuery = loader('../queries/tasks.graphql')
const completeTaskMutation = loader('../queries/completeTask.graphql')
const createTaskMutation = loader('../queries/createTask.graphql')

// This feels like a hack just to get typescript types right...
const useTaskQuery = (queryVariables: TaskFilter) => {
  return useQuery<Task[], TaskFilter>(tasksQuery, {
    variables: queryVariables,
    fetchPolicy: 'network-only',
  })
}

const useCompleteTaskMutation = () => {
  return useMutation<Task, { id: number }>(completeTaskMutation)
}

const useCreateTaskMutation = () => {
  return useMutation<Task, { text: string; projectId?: number }>(
    createTaskMutation
  )
}

type UseTasksHookResult = {
  completeTask: ReturnType<typeof useCompleteTaskMutation>[0]
  queryResult: ReturnType<typeof useTaskQuery>
  onCompleteTask: (task: Task) => Promise<Task | undefined>
  onCreateTask: (task: TaskCreateInput) => Promise<Task | undefined>
}

export function useTasks(queryVariables: TaskFilter): UseTasksHookResult {
  const queryResult = useTaskQuery(queryVariables)
  const [completeTask] = useCompleteTaskMutation()
  const [createTask] = useCreateTaskMutation()

  const onCompleteTask = async (task: Task) => {
    const { data } = await completeTask({
      variables: {
        id: +task.id,
      },
    })
    await queryResult.refetch()

    return data
  }

  const onCreateTask = async (task: TaskCreateInput) => {
    const { data } = await createTask({ variables: task })
    await queryResult.refetch()

    return data
  }

  return {
    completeTask,
    queryResult,
    onCompleteTask,
    onCreateTask,
  }
}
