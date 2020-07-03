import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { Query } from '../components/Query'
import { TaskList } from '../components/TaskList'
import { TaskNew } from '../components/TaskNew'
import { useTasks } from '../hooks/useTasks'

const ProjectTasks: React.FC = () => {
  const match = useRouteMatch<{ id: string }>()
  const { queryResult, onCompleteTask, onCreateTask } = useTasks({
    projectId: +match.params.id,
    done: false,
  })

  return (
    <Query query={queryResult}>
      {({ tasks }) => (
        <>
          <TaskList tasks={tasks} onCompleteTask={onCompleteTask} />
          <div>
            <TaskNew onCreateTask={onCreateTask} projectId={+match.params.id} />
          </div>
        </>
      )}
    </Query>
  )
}

export default ProjectTasks
