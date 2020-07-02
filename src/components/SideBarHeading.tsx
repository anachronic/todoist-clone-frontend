import React from 'react'

interface Props {
  title: string
}

export const SideBarHeading: React.FC<Props> = ({ title }) => {
  return (
    <div className="border-b pb-1 border-gray-600 mb-2">
      <span className="pl-3">{title}</span>
    </div>
  )
}
