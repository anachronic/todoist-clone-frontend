import React from 'react'
import { TaskList } from '../components/TaskList'

const onRemoveTask = (task: number): void => {
  console.log(`${task} was removed`)
}

export const Tasks: React.FC = () => {
  return <TaskList tasks={['task 1', 'task 2']} onRemoveTask={onRemoveTask} />
}