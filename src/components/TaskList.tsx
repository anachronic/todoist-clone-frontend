/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { Button } from './Button'
import { Task } from '../types/Task'
import { useToast } from '../hooks/useToast'

interface Props {
  tasks: Task[]
  onCompleteTask?: (task: Task) => Promise<Task | undefined>
  onScheduleTask?: (id: number, date: Date) => Promise<Task | undefined>
}

export const TaskList: React.FC<Props> = ({
  tasks,
  onCompleteTask,
  onScheduleTask,
}) => {
  const startToast = useToast()

  const scheduleForToday = async (id: number) => {
    if (onScheduleTask) {
      onScheduleTask(id, new Date())
    }
  }

  return (
    <div className="divide-y divide-gray-400">
      {tasks.map((task) => {
        return (
          <div key={task.id} className="py-2 flex flex-row items-center">
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
            <div className="ml-3 flex-grow">{task.text}</div>
            <button onClick={() => scheduleForToday(task.id)}>
              Schedule for today
            </button>
          </div>
        )
      })}
    </div>
  )
}
