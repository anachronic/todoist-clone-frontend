import { Task } from './Task'

export interface Project {
  id: number
  name: string
  tasks: Task[]
}
