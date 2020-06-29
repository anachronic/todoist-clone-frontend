import React from 'react'
import { useFormik } from 'formik'

type Props = {
  type?: string
  form: ReturnType<typeof useFormik>
  name: string
  [key: string]: unknown
}

export const FormikInput = React.forwardRef<HTMLInputElement, Props>(
  function FormikInput({ type = 'text', form, name, ...rest }, ref) {
    return (
      <input
        className="bg-gray-700 px-2 py-1 m-2 border rounded"
        type={type}
        ref={ref}
        value={form.values[name]}
        name={name}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        {...rest}
      />
    )
  }
)
