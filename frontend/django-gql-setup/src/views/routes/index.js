import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FourOhFour from './404';
import Home from '../Home';


export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route component={FourOhFour}/>
      </Switch>
    </div>
  )
}
