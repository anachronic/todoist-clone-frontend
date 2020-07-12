import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  url: string
  name: string
  isActive: boolean
  icon?: JSX.Element | null
}

export const SideBarProjectLink: React.FC<Props> = ({
  url,
  name,
  isActive,
  icon = null,
}) => {
  return (
    <div className="item">
      <Link
        to={url}
        className={classNames({
          active: isActive,
        })}
      >
        {icon}
        <span className="ml2">{name}</span>
      </Link>
    </div>
  )
}
