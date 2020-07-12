import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useAutoFocus } from '../hooks/useAutoFocus'
import { Task } from '../types/Task'
import { TaskCreateInput } from '../types/TaskCreateInput'
import { Button } from './Button'
import { FormikInput } from './FormikInput'

interface FormValues {
  text: string
}

const validationSchema = yup.object().shape({
  text: yup.string().required('Required').min(1, 'At least 1 character'),
})

interface Props {
  onCreateTask?: (task: TaskCreateInput) => Promise<Task | void>
  projectId?: string
}

export const TaskNew: React.FC<Props> = ({ onCreateTask, projectId }) => {
  const [adding, setAdding] = useState(false)
  const [inputRef, setInputFocus] = useAutoFocus()

  const onSubmit = async (values: FormValues) => {
    let createTaskInput: TaskCreateInput = values

    if (typeof projectId !== 'undefined') {
      createTaskInput = {
        ...createTaskInput,
        projectId,
      }
    }

    if (onCreateTask) {
      await onCreateTask(createTaskInput).finally(() => setAdding(false))
    }
  }

  useEffect(() => {
    if (adding) {
      setInputFocus()
    }
  }, [adding, setInputFocus])

  return (
    <div>
      {adding && (
        <Formik
          initialValues={{ text: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormikInput
                name="text"
                className="w-full"
                placeholder="Enter to submit"
                ref={inputRef}
                onBlur={() => setAdding(false)}
              />
            </form>
          )}
        </Formik>
      )}
      {!adding && <Button onClick={() => setAdding(true)}>Add new task</Button>}
    </div>
  )
}
