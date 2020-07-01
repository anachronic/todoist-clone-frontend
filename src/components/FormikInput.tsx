import { useFormik } from 'formik'
import React from 'react'

interface Props {
  type?: string
  label?: string
  form: ReturnType<typeof useFormik>
  name: string
  className?: string
  autofocus: boolean
  [key: string]: unknown
}

export const FormikInput = React.forwardRef<HTMLInputElement, Props>(
  function FormikInput(
    { className, label, type = 'text', form, name, ...rest },
    ref
  ) {
    const hasError = form.touched[name] && form.errors[name]
    let inputClass = [
      'bg-gray-700',
      'px-2',
      'py-1',
      'mx-2',
      'mt-2',
      'border',
      'rounded',
    ]

    if (!hasError) {
      inputClass.push('mb-2')
    }

    if (className) {
      const additionalClasses = className.split(' ')
      inputClass = [...inputClass, ...additionalClasses]
    }

    return (
      <>
        <label>
          {label}
          <input
            className={inputClass.join(' ')}
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
