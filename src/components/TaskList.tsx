import React from 'react'
import { Button } from './Button'

export interface Task {
  id: number
  text: string
  done: boolean
  schedule: string | null
}

interface Props {
  tasks: Task[]
  onRemoveTask?: (task: number) => void
}

export const TaskList: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="divide-y divide-gray-400">
      {tasks.map((task) => {
        return (
          <div key={task.id} className="py-2">
            <Button onClick={() => console.log('remove')}>Complete</Button>
            <span className="ml-3">{task.text}</span>
          </div>
        )
      })}
    </div>
  )
}
