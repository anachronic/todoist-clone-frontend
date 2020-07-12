import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Query } from '../components/Query'
import { TaskList } from '../components/TaskList'
import { TaskNew } from '../components/TaskNew'
import { useProject } from '../hooks/useProject'

const Project: React.FC = () => {
  const match = useRouteMatch<{ id: string }>()
  const { queryResult, completeTask, scheduleTask, createTask } = useProject(
    match.params.id
  )

  return (
    <Query
      query={queryResult}
      isEmptyFn={({ project }) =>
        Array.isArray(project.tasks) && project.tasks.length === 0
      }
      emptyRender={<div>No tasks in this project</div>}
    >
      {({ project }, empty) => (
        <>
          <h1>{project.name}</h1>

          <TaskList
            tasks={project.tasks}
            onScheduleTask={scheduleTask}
            onCompleteTask={completeTask}
          />
          {empty}

          <div className="mt3">
            <TaskNew onCreateTask={createTask} />
          </div>
        </>
      )}
    </Query>
  )
}

export default Project
