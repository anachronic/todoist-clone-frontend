import React from 'react'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'
import { useFormik } from 'formik'
import { FormikInput } from '../components/FormikInput'
import { Button } from '../components/Button'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

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
  const form = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit(values: FormValues) {
      register({ variables: values })
    },
  })

  return (
    <div className="flex">
      <div className="w-2/6 m-auto">
        <form onSubmit={form.handleSubmit} className="px-5 py-8">
          <div>
            <FormikInput name="name" placeholder="name" form={form} />
          </div>

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
            <FormikInput
              type="password"
              name="passwordConfirmation"
              placeholder="passwordConfirmation"
              form={form}
            />
          </div>

          <div>
            <Button type="submit">
              {loading && <span>...</span>}
              <span>Sign Up</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
