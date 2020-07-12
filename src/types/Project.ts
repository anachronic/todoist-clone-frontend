import { Task } from './Task'
import { ProjectColor } from './ProjectColor'

export interface Project {
  id: number
  name: string
  tasks: Task[]
  color?: ProjectColor
}
