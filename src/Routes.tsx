import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { LazyLoad } from './components/LazyLoad'

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Suspense fallback={<LazyLoad />}>
        <Route exact path="/" component={lazy(() => import('./pages/Home'))} />
        <Route
          exact
          path="/about"
          component={lazy(() => import('./pages/About'))}
        />
        <Route
          exact
          path="/tasks"
          component={lazy(() => import('./pages/Tasks'))}
        />
        <Route
          exact
          path="/login"
          component={lazy(() => import('./pages/Login'))}
        />
        <Route
          exact
          path="/signup"
          component={lazy(() => import('./pages/Signup'))}
        />
      </Suspense>
    </Switch>
  )
}
