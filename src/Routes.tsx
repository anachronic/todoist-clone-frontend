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
          path="/today"
          component={lazy(() => import('./pages/Today'))}
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
        <Route
          exact
          path="/projects/:id"
          component={lazy(() => import('./pages/ProjectTasks'))}
          key="project-tasks"
        />
        <Route
          path="/projects/:id/config"
          component={lazy(() => import('./pages/ProjectConfig'))}
          key="project-config"
        />
      </Suspense>
    </Switch>
  )
}
