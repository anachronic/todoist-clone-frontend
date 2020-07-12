/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { Button } from './Button'
import { Task } from '../types/Task'
import { useToast } from '../hooks/useToast'

interface Props {
  tasks: Task[]
  onCompleteTask?: (task: Task) => Promise<Task | void>
  onScheduleTask?: (task: Task, date: Date) => Promise<Task | void>
}

export const TaskList: React.FC<Props> = ({
  tasks,
  onCompleteTask,
  onScheduleTask,
}) => {
  const startToast = useToast()

  const scheduleForToday = async (task: Task) => {
    if (onScheduleTask) {
      onScheduleTask(task, new Date())
    }
  }

  return (
    <div className="divide-y divide-gray-400">
      {tasks.map((task) => {
        return (
          <div key={task.id} className="py2 row vcenter">
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
            <div className="ml3 grow">{task.text}</div>
            <button onClick={() => scheduleForToday(task)}>
              Schedule for today
            </button>
          </div>
        )
      })}
    </div>
  )
}
