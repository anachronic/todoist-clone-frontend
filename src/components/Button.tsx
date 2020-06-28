import React from 'react'

export const Button: React.FC = ({ children }) => {
  return (
    <button className="bg-blue-600 hover:bg-blue-500 text-gray-200 px-2 py-1 rounded">
      {children}
    </button>
  )
}
