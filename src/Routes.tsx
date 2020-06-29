import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Home } from './pages/Home'
import { Tasks } from './pages/Tasks'
import { Login } from './pages/Login'

export const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/about">
        About this app
      </Route>
      <Route exact path="/tasks">
        <Tasks />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  )
}
