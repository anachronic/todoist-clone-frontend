import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { TasksView } from '../components/TaskView'

const ProjectTasks: React.FC = () => {
  const match = useRouteMatch<{ id: string }>()

  return (
    <TasksView
      filters={{
        projectId: +match.params.id,
        done: false,
      }}
    />
  )
}

export default ProjectTasks
