import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import { loader } from 'graphql.macro'
import React from 'react'
import { IoIosDocument } from 'react-icons/io'
import { FiInbox, FiCalendar } from 'react-icons/fi'
import { Link, useRouteMatch } from 'react-router-dom'
import { Project } from '../types/Project'
import { ProjectNew } from './ProjectNew'
import { Query } from './Query'

const projectsGraphqlQuery = loader('../queries/projects.graphql')

export const SideBar: React.FC = () => {
  const projectsQuery = useQuery(projectsGraphqlQuery)
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
            <div className="item">
              <Link
                to={`/projects/${inbox.id}`}
                className={classNames({
                  active: `${inbox.id}` === matchProjects?.params.id,
                })}
              >
                <FiInbox className="inline" size="1.5rem" />
                <span className="ml2">{inbox.name}</span>
              </Link>
            </div>
            <div className="item">
              <Link
                to="/today"
                className={classNames({
                  active: matchToday,
                })}
              >
                <FiCalendar className="inline" size="1.5rem" />
                <span className="ml2">Today</span>
              </Link>
            </div>
          </div>

          <div>
            <div className="heading">
              <span className="pl3">Projects</span>
            </div>

            {projects.map((project: Project) => (
              <div className="item" key={project.id}>
                <Link
                  to={`/projects/${project.id}`}
                  className={classNames({
                    active: matchProjects?.params.id === `${project.id}`,
                  })}
                >
                  <IoIosDocument className="inline" size="1.5rem" />
                  <span className="ml2">{project.name}</span>
                </Link>
              </div>
            ))}
          </div>

          <ProjectNew onProjectAdded={() => projectsQuery.refetch()} />
        </div>
      )}
    </Query>
  )
}
