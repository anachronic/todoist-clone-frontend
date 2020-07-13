import { fireEvent, render, waitFor } from '@testing-library/react'
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'
import { FormikInput } from '../FormikInput'

describe('The FormikInput component', () => {
  it('Binds value', async () => {
    const { getByPlaceholderText } = render(
      <Formik initialValues={{ val: '' }} onSubmit={jest.fn()}>
        {() => <FormikInput name="val" placeholder="val"></FormikInput>}
      </Formik>
    )

    const input = getByPlaceholderText('val')
    await waitFor(() => {
      fireEvent.change(input, { target: { value: 'heh' } })
    })

    expect(input).toHaveValue('heh')
  })

  it('Shows errors for the field', async () => {
    const validationSchema = yup.object().shape({
      val: yup.string().notOneOf(['heh']),
    })
    const { getByPlaceholderText } = render(
      <Formik
        initialValues={{ val: '' }}
        validationSchema={validationSchema}
        onSubmit={jest.fn()}
      >
        {() => <FormikInput name="val" placeholder="val"></FormikInput>}
      </Formik>
    )

    const input = getByPlaceholderText('val')
    await waitFor(() => {
      fireEvent.change(input, { target: { value: 'heh' } })
      fireEvent.blur(input)
    })

    expect(input).toHaveClass('danger')
  })

  it('Shows label if specified', async () => {
    const { getByText } = render(
      <Formik initialValues={{ val: '' }} onSubmit={jest.fn()}>
        {() => <FormikInput label="My Label" name="val" />}
      </Formik>
    )

    const label = getByText('My Label')
    expect(label).toBeInTheDocument()
  })
})
