import { useQuery, useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import React from 'react'
import { FiCircle } from 'react-icons/fi'
import { useRouteMatch } from 'react-router-dom'
import { Button } from '../components/Button'
import { Query } from '../components/Query'
import { Project } from '../types/Project'
import { ProjectColor } from '../types/ProjectColor'

const configQuery = loader('../queries/projectConfig.graphql')
const updateMutation = loader('../queries/updateProject.graphql')

const ProjectConfig: React.FC = () => {
  const match = useRouteMatch<{ id: string }>('/projects/:id/config')

  const query = useQuery<{ projectColors: ProjectColor; project: Project }>(
    configQuery,
    {
      fetchPolicy: 'cache-first',
      variables: { projectId: match?.params.id ? +match.params.id : null },
    }
  )
  const [updateProject] = useMutation<Project>(updateMutation)

  return (
    <Query query={query} isEmptyFn={() => false}>
      {({ project, projectColors }) => (
        <div className="container">
          <Button outlined>test</Button>
          <div className="row vcentered">
            <div>
              <strong>Project name</strong>
            </div>

            <div>{project.name}</div>
          </div>
          <div className="row vcentered">
            <div>
              <strong>Choose a color for this project</strong>
            </div>
            <div>
              {projectColors.map((projectColor: ProjectColor) => (
                <div key={projectColor.id}>
                  <Button
                    outlined
                    variant="accent"
                    className="row vcentered fullwidth"
                    onClick={async () => {
                      await updateProject({
                        variables: {
                          id: +project.id,
                          colorId: +projectColor.id,
                        },
                      })
                    }}
                  >
                    <FiCircle
                      style={{
                        fill: `#${projectColor.hex}`,
                      }}
                    />
                    <span>{projectColor.name}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Query>
  )
}

export default ProjectConfig