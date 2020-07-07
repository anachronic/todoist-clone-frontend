import { useField } from 'formik'
import React, { HTMLProps, Ref } from 'react'

interface Props extends Omit<HTMLProps<HTMLInputElement>, 'name'> {
  name: string
  autofocus?: boolean
}

export const FormikInput = React.forwardRef(function FormikInput(
  { className, ...props }: Props,
  ref: Ref<HTMLInputElement>
) {
  const [field, meta] = useField(props.name)
  let inputClass = [
    'bg-gray-700',
    'px-2',
    'py-1',
    'mx-2',
    'mt-2',
    'border',
    'rounded',
  ]

  if (!meta.touched || !meta.error) {
    inputClass.push('mb-2')
  }

  if (className) {
    const additionalClasses = className.split(' ')
    inputClass = [...inputClass, ...additionalClasses]
  }

  return (
    <>
      <label>
        {props.label}
        <input
          className={inputClass.join(' ')}
          ref={ref}
          {...field}
          {...props}
        />
      </label>
      {meta.touched && meta.error && (
        <div className="mb-2 mx-2 text-red-500 text-sm">{meta.error}</div>
      )}
    </>
  )
})
