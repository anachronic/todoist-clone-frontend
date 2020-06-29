import { useFormik } from 'formik'
import React from 'react'
import { Button } from '../components/Button'
import { FormikInput } from '../components/FormikInput'

interface FormValues {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit(values: FormValues) {
      console.log(values)
    },
  })

  return (
    <div className="flex">
      <div className="w-2/6 m-auto">
        <form onSubmit={form.handleSubmit} className="px-5 py-8">
          <div>
            <FormikInput
              type="email"
              name="email"
              placeholder="email"
              form={form}
            />
          </div>

          <div>
            <FormikInput
              type="password"
              name="password"
              placeholder="password"
              form={form}
            />
          </div>

          <div>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
