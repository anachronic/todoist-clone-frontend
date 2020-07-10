import React from 'react'
import { TasksView } from '../components/TaskView'

const Today: React.FC = () => {
  return (
    <TasksView
      filters={{
        done: false,
        forToday: true,
      }}
    />
  )
}

export default Today
