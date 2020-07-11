import classNames from 'classnames'
import { useField } from 'formik'
import React, { HTMLProps, Ref, useMemo } from 'react'

interface Props extends Omit<HTMLProps<HTMLInputElement>, 'name' | 'label'> {
  name: string
  label?: string | null
  autofocus?: boolean
  variant?: 'primary' | 'accent' | 'warning' | 'danger' | 'info'
}

export const FormikInput = React.forwardRef(function FormikInput(
  { className, label = null, variant = 'accent', ...props }: Props,
  ref: Ref<HTMLInputElement>
) {
  const [field, meta] = useField(props.name)
  const hasError = useMemo(() => !!meta.touched && !!meta.error, [
    meta.touched,
    meta.error,
  ])

  return (
    <div className="formik-input">
      {label && <label>{label}</label>}
      <input
        className={classNames(
          'input',
          className,
          { mb2: !hasError, danger: hasError },
          variant
        )}
        ref={ref}
        {...field}
        {...props}
      />
      {hasError && (
        <div className="mt1 mb2 mx2 text-danger text-small">{meta.error}</div>
      )}
    </div>
  )
})
