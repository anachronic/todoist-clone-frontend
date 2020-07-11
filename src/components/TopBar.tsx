import classNames from 'classnames'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuthStore } from '../hooks/useAuthStore'
import { Button } from './Button'

interface Props {
  className?: string
}

export const TopBar: React.FC<Props> = ({ className }) => {
  const history = useHistory()
  const authStore = useAuthStore()

  return useObserver(() => (
    <div className={classNames('topbar', className)}>
      <div className="row vcenter grow">
        <div className="item">
          <Link to="/">Go Home</Link>
        </div>
        <div className="item">
          <Link to="/about">About</Link>
        </div>
        <div className="item">
          <Link to="/tasks">Tasks</Link>
        </div>
      </div>

      <div className="row vcenter">
        <div className="px3">
          {authStore.isAuthenticated ? (
            <Button
              onClick={async () => {
                await authStore.logout()
                history.push('/login')
              }}
            >
              Log out
            </Button>
          ) : (
            <Button onClick={() => history.push('/login')}>Log in</Button>
          )}
        </div>
      </div>
    </div>
  ))
}
