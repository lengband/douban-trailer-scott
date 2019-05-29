import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Routes from './routes'
import 'antd/dist/antd.css'
import './assets/common.sass'

export default () => (
  <Switch>
    {
      Routes.map(({ name, path, exact = true, component }) => (
        <Route path={path} component={component} key={name} exact={exact} />
      ))
    }
    <Redirect from="/" to="/list" />
  </Switch>
)


