import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import { loader } from 'graphql.macro'
import React from 'react'
import { FiRotateCcw } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { Button } from '../components/Button'
import { FormikInput } from '../components/FormikInput'

const mutation = loader('../queries/register.graphql')

interface FormValues {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  name: yup.string().required('Required').min(2),
  password: yup.string().required('Required').min(6),
  passwordConfirmation: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .min(6),
})

const Signup: React.FC = () => {
  const history = useHistory()

  const [register, { loading }] = useMutation(mutation, {
    onCompleted: ({ registerUser }) => {
      if (registerUser && registerUser.id) {
        history.push('/login')
      } else {
        console.log('show some sort of fail message')
      }
    },
  })

  return (
    <div className="row mt5 signup-page">
      <div className="centered">
        <Formik
          initialValues={{
            email: '',
            name: '',
            password: '',
            passwordConfirmation: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values: FormValues) => register({ variables: values })}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormikInput name="name" placeholder="name" />

              <FormikInput type="email" name="email" placeholder="email" />

              <FormikInput
                type="password"
                name="password"
                placeholder="password"
              />

              <FormikInput
                type="password"
                name="passwordConfirmation"
                placeholder="passwordConfirmation"
              />

              <div>
                <Button
                  type="submit"
                  className="inline-flex row vcentered"
                  disabled={loading}
                >
                  {loading && <FiRotateCcw className="inline icon-spin mr2" />}
                  <span>Sign up</span>
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Signup
