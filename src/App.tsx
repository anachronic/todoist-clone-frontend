import React from 'react'
import './assets/styles.css'
import { TopBar } from './components/TopBar'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Tasks } from './pages/Tasks'

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <TopBar />
        <div className="container mx-auto mt-3">
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
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}
