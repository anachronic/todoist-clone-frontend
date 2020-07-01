/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { Button } from './Button'
import { Task } from '../types/Task'

interface Props {
  tasks: Task[]
  onCompleteTask?: (task: Task) => void
}

export const TaskList: React.FC<Props> = ({
  tasks,
  onCompleteTask = () => {},
}) => {
  return (
    <div className="divide-y divide-gray-400">
      {tasks.map((task) => {
        return (
          <div key={task.id} className="py-2">
            <Button onClick={() => onCompleteTask(task)}>Complete</Button>
            <span className="ml-3">{task.text}</span>
          </div>
        )
      })}
    </div>
  )
}
