import React from 'react'
import { TasksView } from '../components/TaskView'

const Tasks: React.FC = () => {
  return <TasksView filters={{ done: false }} />
}

export default Tasks
