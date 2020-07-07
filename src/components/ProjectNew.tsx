import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { loader } from 'graphql.macro'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useAutoFocus } from '../hooks/useAutoFocus'
import { Project } from '../types/Project'
import { Button } from './Button'
import { FormikInput } from './FormikInput'

interface FormValues {
  name: string
}

const validationSchema = yup.object().shape({
  name: yup.string().required('Required').min(1, 'At least 1 character'),
})

const mutation = loader('../queries/createProject.graphql')

interface Props {
  onProjectAdded?: (project: Project) => void
}

export const ProjectNew: React.FC<Props> = ({ onProjectAdded }) => {
  const [adding, setAdding] = useState(false)
  const [inputRef, setInputFocus] = useAutoFocus()
  const [createTask] = useMutation(mutation)

  useEffect(() => {
    if (adding) {
      setInputFocus()
    }
  }, [adding, setInputFocus])

  return (
    <div>
      {adding && (
        <Formik
          initialValues={{ name: '' }}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues) => {
            createTask({ variables: values }).then(({ data }) => {
              setAdding(false)
              if (onProjectAdded) {
                onProjectAdded(data.createTask)
              }
            })
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormikInput
                className="w-full"
                name="name"
                placeholder="Enter to create"
                ref={inputRef}
                onBlur={() => setAdding(false)}
              />
            </form>
          )}
        </Formik>
      )}
      {!adding && (
        <Button onClick={() => setAdding(true)}>Add new project</Button>
      )}
    </div>
  )
}
