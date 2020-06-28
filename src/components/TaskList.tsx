import React from 'react'
import { Button } from './Button'

// eslint-disable-next-line @typescript-eslint/no-empty-function
const nop: () => void = () => {}

interface Props {
  tasks: string[]
  onRemoveTask?: (task: number) => void
}

export const TaskList: React.FC<Props> = ({ tasks, onRemoveTask = nop }) => {
  return (
    <div className="divide-y divide-gray-400">
      {tasks.map((task) => {
        const k = Math.random()
        return (
          <div key={k} className="py-2">
            <Button onClick={() => onRemoveTask(k)}>Complete</Button>
            <span className="ml-3">
              {k}: {task}
            </span>
          </div>
        )
      })}
    </div>
  )
}
