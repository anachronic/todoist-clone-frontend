import React from 'react'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  [key: string]: unknown
}

export const Button: React.FC<Props> = ({
  children,
  type = 'button',
  className,
  ...forward
}) => {
  let classNames =
    'bg-blue-600 hover:bg-blue-500 text-gray-200 px-2 py-1 rounded'

  if (className) {
    classNames = [classNames, className].join(' ')
  }

  return (
    <button type={type} className={classNames} {...forward}>
      {children}
    </button>
  )
}
