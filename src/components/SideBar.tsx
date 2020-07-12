import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { FiCalendar, FiCircle, FiInbox } from 'react-icons/fi'
import { useRouteMatch } from 'react-router-dom'
import { Project } from '../types/Project'
import { ProjectNew } from './ProjectNew'
import { Query } from './Query'
import { SideBarProjectLink } from './SideBarProjectLink'

const projectsGraphqlQuery = loader('../queries/projects.graphql')

export const SideBar: React.FC = () => {
  const projectsQuery = useQuery(projectsGraphqlQuery, {})
  const matchProjects = useRouteMatch<{ id: string }>({
    path: '/projects/:id',
  })
  const matchToday = useRouteMatch<{ id: string }>({
    path: '/today',
  })

  return (
    <Query query={projectsQuery}>
      {({ projects, inbox }) => (
        <div className="sidebar">
          <div>
            <SideBarProjectLink
              key="project-inbox"
              url={`/projects/${inbox.id}`}
              name={inbox.name}
              isActive={`${inbox.id}` === matchProjects?.params.id}
              icon={<FiInbox className="inline" size="1.5rem" />}
            />
            <SideBarProjectLink
              key="project-today"
              url={`/today`}
              name="Today"
              isActive={!!matchToday}
              icon={<FiCalendar className="inline" size="1.5rem" />}
            />
          </div>

          <div>
            <div className="heading">
              <span className="pl3">Projects</span>
            </div>

            {projects.map((project: Project) => (
              <SideBarProjectLink
                key={`project-${project.id}`}
                url={`/projects/${project.id}`}
                name={project.name}
                isActive={matchProjects?.params.id === `${project.id}`}
                icon={
                  <FiCircle style={fillProjectCircle(project)} size="1.5rem" />
                }
              />
            ))}
          </div>

          <ProjectNew onProjectAdded={() => projectsQuery.refetch()} />
        </div>
      )}
    </Query>
  )
}

function fillProjectCircle(project: Project): { fill?: string } {
  if (project.color?.hex) {
    return {
      fill: `#${project.color.hex}`,
    }
  }

  return {}
}
