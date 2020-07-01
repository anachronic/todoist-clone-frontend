import { useMutation } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import { loader } from 'graphql.macro'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useAutoFocus } from '../hooks/useAutoFocus'
import { Button } from './Button'
import { FormikInput } from './FormikInput'

interface FormValues {
  text: string
}

const validationSchema = yup.object().shape({
  text: yup.string().required('Required').min(1, 'At least 1 character'),
})

const mutation = loader('../queries/createTask.graphql')

interface Props {
  onTaskAdded?: (task: any) => void
}

export const TaskNew: React.FC<Props> = ({ onTaskAdded }) => {
  const [adding, setAdding] = useState(false)
  const [inputRef, setInputFocus] = useAutoFocus()
  const [createTask] = useMutation(mutation)

  const form = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit(values: FormValues) {
      createTask({ variables: values }).then(({ data }) => {
        setAdding(false)
        if (onTaskAdded) {
          onTaskAdded(data.createTask)
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
            name="text"
            placeholder="Enter to submit"
            ref={inputRef}
          />
        </form>
      )}
      {!adding && <Button onClick={() => setAdding(true)}>Add new task</Button>}
    </div>
  )
}
