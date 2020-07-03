import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useAutoFocus } from '../hooks/useAutoFocus'
import { TaskCreateInput } from '../types/TaskCreateInput'
import { Button } from './Button'
import { FormikInput } from './FormikInput'
import { Task } from '../types/Task'

interface FormValues {
  text: string
}

const validationSchema = yup.object().shape({
  text: yup.string().required('Required').min(1, 'At least 1 character'),
})

interface Props {
  onCreateTask?: (task: TaskCreateInput) => Promise<Task | undefined>
  projectId?: number
}

export const TaskNew: React.FC<Props> = ({ onCreateTask, projectId }) => {
  const [adding, setAdding] = useState(false)
  const [inputRef, setInputFocus] = useAutoFocus()

  const form = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    async onSubmit(values: FormValues) {
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
