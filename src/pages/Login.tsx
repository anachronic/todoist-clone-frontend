import { useMutation } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import { loader } from 'graphql.macro'
import React from 'react'
import { Button } from '../components/Button'
import { FormikInput } from '../components/FormikInput'
import { useAuthStore } from '../hooks/useAuthStore'

interface FormValues {
  email: string
  password: string
}

export const Login: React.FC = () => {
  const authStore = useAuthStore()
  const [requestLogin, { loading }] = useMutation(
    loader('../queries/requestLogin.graphql'),
    {
      onCompleted: ({ obtainAuthToken: token }) => {
        if (token) {
          authStore.authenticate(token)
        } else {
          console.log('show some sort of fail message')
        }
      },
    }
  )
  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: () => ({}),
    async onSubmit(values: FormValues) {
      await requestLogin({ variables: values })
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
            <Button type="submit">
              {loading && <span>...</span>}
              <span>Login</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
