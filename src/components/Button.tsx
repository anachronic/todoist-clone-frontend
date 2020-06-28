import React from 'react'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  [key: string]: unknown
}

export const Button: React.FC<Props> = ({
  children,
  type = 'button',
  ...forward
}) => {
  return (
    <button
      type={type}
      className="bg-blue-600 hover:bg-blue-500 text-gray-200 px-2 py-1 rounded"
      {...forward}
    >
      {children}
    </button>
  )
}
