import React from 'react'
import { useFormik } from 'formik'

type Props = {
  type?: string
  label?: string
  form: ReturnType<typeof useFormik>
  name: string
  [key: string]: unknown
}

export const FormikInput = React.forwardRef<HTMLInputElement, Props>(
  function FormikInput({ label, type = 'text', form, name, ...rest }, ref) {
    const hasError = form.touched[name] && form.errors[name]

    return (
      <>
        <label>
          {label}
          <input
            className={`bg-gray-700 px-2 py-1 mx-2 mt-2 border rounded ${
              hasError ? '' : 'mb-2'
            }`}
            type={type}
            ref={ref}
            value={form.values[name]}
            name={name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            {...rest}
          />
        </label>
        {hasError && (
          <div className="mb-2 mx-2 text-red-500 text-sm">
            {form.errors[name]}
          </div>
        )}
      </>
    )
  }
)
