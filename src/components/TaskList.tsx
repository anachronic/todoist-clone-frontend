/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { Button } from './Button'
import { Task } from '../types/Task'
import { useToast } from '../hooks/useToast'
import { FiClock } from 'react-icons/fi'

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
                    position: 'bottom-center',
                  })
                }
              }}
            >
              Complete
            </Button>
            <div className="ml3 grow">{task.text}</div>
            <Button
              variant="info"
              outlined
              className="row vcenter"
              onClick={() => scheduleForToday(task)}
            >
              <FiClock />
            </Button>
          </div>
        )
      })}
    </div>
  )
}
