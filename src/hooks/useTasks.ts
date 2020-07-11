import { useMutation, useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import { Task } from '../types/Task'
import { TaskCreateInput } from '../types/TaskCreateInput'
import { TaskFilter } from '../types/TaskFilter'

const tasksQuery = loader('../queries/tasks.graphql')
const completeTaskMutation = loader('../queries/completeTask.graphql')
const scheduleTaskMutation = loader('../queries/scheduleTask.graphql')
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

const useScheduleTaskMutation = () => {
  return useMutation<Task, { id: number; schedule: string }>(
    scheduleTaskMutation
  )
}

type UseTasksHookResult = {
  completeTask: ReturnType<typeof useCompleteTaskMutation>[0]
  queryResult: ReturnType<typeof useTaskQuery>
  onCompleteTask: (task: Task) => Promise<Task | undefined>
  onCreateTask: (task: TaskCreateInput) => Promise<Task | undefined>
  onScheduleTask: (id: number, schedule: Date) => Promise<Task | undefined>
}

export function useTasks(queryVariables: TaskFilter): UseTasksHookResult {
  const queryResult = useTaskQuery(queryVariables)
  const [completeTask] = useCompleteTaskMutation()
  const [createTask] = useCreateTaskMutation()
  const [scheduleTask] = useScheduleTaskMutation()

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
    const { projectId } = queryVariables
    const { data } = await createTask({
      variables: {
        ...task,
        projectId,
      },
    })
    await queryResult.refetch()

    return data
  }

  const onScheduleTask = async (id: number, schedule: Date) => {
    const { data } = await scheduleTask({
      variables: { id, schedule: schedule.toJSON() },
    })
    await queryResult.refetch()

    return data
  }

  return {
    completeTask,
    queryResult,
    onCompleteTask,
    onCreateTask,
    onScheduleTask,
  }
}
