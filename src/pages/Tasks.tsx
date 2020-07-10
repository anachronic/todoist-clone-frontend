import React from 'react'
import { Query } from '../components/Query'
import { TaskList } from '../components/TaskList'
import { TaskNew } from '../components/TaskNew'
import { useTasks } from '../hooks/useTasks'

const Tasks: React.FC = () => {
  const {
    queryResult,
    onCompleteTask,
    onCreateTask,
    onScheduleTask,
  } = useTasks({
    done: false,
  })

  return (
    <Query
      query={queryResult}
      isEmptyFn={(data) =>
        !Array.isArray(data.tasks) || data.tasks.length === 0
      }
    >
      {(data) => (
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
      )}
    </Query>
  )
}

export default Tasks
