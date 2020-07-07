/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { Button } from './Button'
import { Task } from '../types/Task'
import { useToast } from '../hooks/useToast'

interface Props {
  tasks: Task[]
  onCompleteTask?: (task: Task) => Promise<Task | undefined>
}

export const TaskList: React.FC<Props> = ({ tasks, onCompleteTask }) => {
  const startToast = useToast()

  return (
    <div className="divide-y divide-gray-400">
      {tasks.map((task) => {
        return (
          <div key={task.id} className="py-2 flex flex-row">
            <Button
              onClick={async () => {
                if (onCompleteTask) {
                  await onCompleteTask(task)
                  startToast({
                    text: 'Task completed',
                    timeout: 2000,
                  })
                }
              }}
            >
              Complete
            </Button>
            <span className="ml-3">{task.text}</span>
          </div>
        )
      })}
    </div>
  )
}
