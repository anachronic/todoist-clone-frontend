import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { loader } from 'graphql.macro'
import React from 'react'
import { IoIosRefresh } from 'react-icons/io'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../components/Button'
import { FormikInput } from '../components/FormikInput'
import { useAuthStore } from '../hooks/useAuthStore'

interface FormValues {
  email: string
  password: string
}

const mutation = loader('../queries/requestLogin.graphql')

const Login: React.FC = () => {
  const authStore = useAuthStore()
  const history = useHistory()

  const [requestLogin, { loading }] = useMutation(mutation, {
    onCompleted: ({ obtainAuthToken: token }) => {
      if (token) {
        authStore.authenticate(token)
        history.push('/')
      } else {
        console.log('show some sort of fail message')
      }
    },
  })

  return (
    <div className="flex">
      <div className="w-2/6 m-auto">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values: FormValues) => requestLogin({ variables: values })}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="px-5 py-8">
              <div>
                <FormikInput type="email" name="email" placeholder="email" />
              </div>

              <div>
                <FormikInput
                  type="password"
                  name="password"
                  placeholder="password"
                />
              </div>

              <div>
                <Button type="submit">
                  {loading && (
                    <IoIosRefresh className="inline icon-spin mr-1" />
                  )}
                  <span>Login</span>
                </Button>
              </div>

              <div>
                {`Don't`} have an account? <Link to="/signup">Sign up!</Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
