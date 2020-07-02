import { useMutation } from '@apollo/react-hooks'
import { useFormik } from 'formik'
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

  const form = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit(values: FormValues) {
      createTask({ variables: values }).then(({ data }) => {
        setAdding(false)
        if (onProjectAdded) {
          onProjectAdded(data.createTask)
        }
      })
    },
  })

  useEffect(() => {
    if (adding) {
      setInputFocus()
    }
  }, [adding, setInputFocus])

  return (
    <div>
      {adding && (
        <form onSubmit={form.handleSubmit}>
          <FormikInput
            className="w-full"
            form={form}
            name="name"
            placeholder="Enter to create"
            ref={inputRef}
          />
        </form>
      )}
      {!adding && (
        <Button onClick={() => setAdding(true)}>Add new project</Button>
      )}
    </div>
  )
}
