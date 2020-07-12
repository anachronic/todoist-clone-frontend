import { useMutation, useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import produce from 'immer'
import { Project } from '../types/Project'
import { Task } from '../types/Task'
import { TaskCreateInput } from '../types/TaskCreateInput'

const projectQuery = loader('../queries/project.graphql')
const tasksQuery = loader('../queries/tasks.graphql')
const completeTaskMutation = loader('../queries/completeTask.graphql')
const scheduleTaskMutation = loader('../queries/scheduleTask.graphql')
const createTaskMutation = loader('../queries/createTask.graphql')

const useProjectQuery = (variables: { id: string }) => {
  return useQuery<Project, { id: string }>(projectQuery, { variables })
}

const useCompleteTaskMutation = () => {
  return useMutation<{ updateTask: Task }, { id: string }>(completeTaskMutation)
}

const useCreateTaskMutation = () => {
  return useMutation<
    { createTask: Task },
    { text: string; projectId?: string }
  >(createTaskMutation)
}

const useScheduleTaskMutation = () => {
  return useMutation<Task, { id: string; schedule: string }>(
    scheduleTaskMutation
  )
}

const updateProjectCache = (projectId: string, key?: string) => (
  store: any,
  { data }: any
) => {
  if (!data) {
    return
  }

  const cachedQuery = store.readQuery({
    query: projectQuery,
    variables: { id: projectId },
  })

  if (!cachedQuery) {
    return
  }
  const { project } = cachedQuery

  store.writeQuery({
    query: projectQuery,
    variables: { id: projectId },
    data: {
      project: produce(project, (draft: Project) => {
        if (key) {
          const newTasks = draft.tasks.filter(
            (task: Task) => data[key].id !== task.id
          )
          if (!data[key].done) {
            newTasks.push(data[key])
          }
          draft.tasks = newTasks
        } else {
          draft.tasks.push(data.createTask)
        }
      }),
    },
  })
}

type UseProjectHook = (
  projectId: string
) => {
  queryResult: ReturnType<typeof useProjectQuery>
  completeTask: (task: Task) => Promise<Task | void>
  createTask: (task: TaskCreateInput) => Promise<Task | void>
  scheduleTask: (task: Task, schedule: Date) => Promise<Task | void>
}

export const useProject: UseProjectHook = (projectId) => {
  const queryResult = useProjectQuery({ id: projectId })
  const [completeTask] = useCompleteTaskMutation()
  const [createTask] = useCreateTaskMutation()
  const [scheduleTask] = useScheduleTaskMutation()

  return {
    queryResult,
    completeTask: async (task: Task) => {
      await completeTask({
        variables: { id: task.id },
        update: updateProjectCache(projectId, 'updateTask'),
      })
    },
    createTask: async (task: TaskCreateInput) => {
      await createTask({
        variables: { ...task, projectId },
        update: updateProjectCache(projectId),
      })
    },
    scheduleTask: async (task: Task, schedule: Date) => {
      await scheduleTask({
        variables: { schedule: schedule.toJSON(), id: task.id },
        update: (store: any, { data }: any) => {
          if (!data) {
            return
          }

          // update project query
          const cachedQuery = store.readQuery({
            query: projectQuery,
            variables: { id: projectId },
          })

          if (!cachedQuery) {
            return
          }
          const { project } = cachedQuery

          store.writeQuery({
            query: projectQuery,
            variables: { id: projectId },
            data: {
              project: produce(project, (draft: Project) => {
                const index = draft.tasks.findIndex(
                  (task: Task) => data.updateTask.id === task.id
                )
                draft.tasks[index] = data.updateTask
              }),
              data,
            },
          })

          // update today query
          try {
            const cachedTasksQuery = store.readQuery({
              query: tasksQuery,
              variables: { done: false, forToday: true },
            })

            if (!cachedTasksQuery) {
              return
            }

            const { tasks } = cachedTasksQuery

            store.writeQuery({
              query: tasksQuery,
              variables: { done: false, forToday: true },
              data: {
                tasks: produce(tasks, (tasks: Array<any>) => {
                  const index = tasks.findIndex(
                    (task: Task) => data.updateTask.id === task.id
                  )
                  if (index >= 0) {
                    tasks[index] = data.updateTask
                  } else {
                    tasks.unshift(data.updateTask)
                  }
                }),
              },
            })
          } catch (e) {
            return
          }
        },
      })
    },
  }
}
