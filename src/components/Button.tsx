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
  const classNames = [
    'bg-blue-600',
    'hover:bg-blue-500',
    'text-gray-200',
    'px-2',
    'py-1',
    'rounded',
    'items-center',
    'flex',
    'inline',
    'flex-shrink',
    ...(className || '').split(' '),
  ]

  return (
    <button type={type} className={classNames.join(' ')} {...forward}>
      {children}
    </button>
  )
}
