import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { IoIosDocument } from 'react-icons/io'
import { useHistory } from 'react-router-dom'
import { Project } from '../types/Project'
import { ProjectNew } from './ProjectNew'
import { Query } from './Query'
import { SideBarElement } from './SideBarElement'
import { SideBarHeading } from './SideBarHeading'

const projectsQuery = loader('../queries/projects.graphql')

export const SideBar: React.FC = () => {
  const query = useQuery(projectsQuery)
  const history = useHistory()

  return (
    <Query query={query}>
      {({ projects }) => (
        <div className="space-y-10">
          <div className="">
            <SideBarElement title="Inbox">
              <IoIosDocument className="inline" size="1.5rem" />
            </SideBarElement>
            <SideBarElement title="Today">
              <IoIosDocument className="inline" size="1.5rem" />
            </SideBarElement>
          </div>

          <div className="">
            <SideBarHeading title="Projects" />

            {projects.map((project: Project) => (
              <SideBarElement
                key={project.id}
                title={project.name}
                onClick={() => history.push(`/projects/${project.id}`)}
              >
                <IoIosDocument className="inline" size="1.5rem" />
              </SideBarElement>
            ))}
          </div>

          <ProjectNew onProjectAdded={() => query.refetch()} />
        </div>
      )}
    </Query>
  )
}
