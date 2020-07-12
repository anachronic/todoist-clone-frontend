import classNames from 'classnames'
import React, { forwardRef, HTMLProps, Ref } from 'react'

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button'
  variant?: 'primary' | 'warning' | 'danger' | 'accent'
  outlined?: boolean
  slim?: boolean
}

export const Button = forwardRef(function Button(
  {
    type = 'button',
    variant = 'primary',
    outlined,
    slim,
    className,
    children,
    ...props
  }: Props,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <button
      ref={ref}
      type={type}
      className={classNames(
        'button',
        { slim },
        { outlined },
        variant,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
