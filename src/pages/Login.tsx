import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { loader } from 'graphql.macro'
import React from 'react'
import { FiRotateCcw } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '../components/Button'
import { FormikInput } from '../components/FormikInput'
import { useAuthStore } from '../hooks/useAuthStore'
import { useToast } from '../hooks/useToast'
import * as yup from 'yup'

interface FormValues {
  email: string
  password: string
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email'),
  password: yup.string().required('Enter a password'),
})

const mutation = loader('../queries/requestLogin.graphql')

const Login: React.FC = () => {
  const authStore = useAuthStore()
  const history = useHistory()
  const startToast = useToast()

  const [requestLogin, { loading }] = useMutation(mutation, {
    onCompleted: ({ obtainAuthToken: token }) => {
      if (token) {
        authStore.authenticate(token)
        history.push('/')
      } else {
        startToast({
          text: 'Login failed due to bad credentials, please try again',
          position: 'top-center',
          variant: 'danger',
        })
      }
    },
  })

  return (
    <div className="row mt5">
      <div className="centered">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues) => requestLogin({ variables: values })}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="px-5 py-8">
              <FormikInput type="email" name="email" placeholder="email" />

              <FormikInput
                type="password"
                name="password"
                placeholder="password"
              />

              <div>
                <Button
                  type="submit"
                  className="inline-flex row vcentered"
                  disabled={loading}
                >
                  {loading && <FiRotateCcw className="inline icon-spin mr2" />}
                  <span>Login</span>
                </Button>
              </div>

              <div className="mt4">
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
