import React from 'react'
import { Query } from './Query'
import { TaskList } from './TaskList'
import { TaskFilter } from '../types/TaskFilter'
import { useTasks } from '../hooks/useTasks'
import { TaskNew } from './TaskNew'

interface Props {
  filters: TaskFilter
  title?: string
}

export const TasksView: React.FC<Props> = ({ filters, title }) => {
  const {
    queryResult,
    onCompleteTask,
    onCreateTask,
    onScheduleTask,
  } = useTasks(filters)

  return (
    <Query
      query={queryResult}
      isEmptyFn={(data) =>
        !Array.isArray(data.tasks) || data.tasks.length === 0
      }
    >
      {(data) => (
        <>
          {title && <h1>{title}</h1>}
          <div className="mx-5">
            <TaskList
              tasks={data.tasks}
              onCompleteTask={onCompleteTask}
              onScheduleTask={onScheduleTask}
            />
            <div>
              <TaskNew onCreateTask={onCreateTask} />
            </div>
          </div>
        </>
      )}
    </Query>
  )
}
