import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FourOhFour from './404';
import Home from '../Home';
import Petition from '../Petition';
import Thanks from '../Thanks';
export const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/thanks" component={Thanks}/>
        <Route path="/:id" component={Petition}/>
        <Route component={FourOhFour}/>
      </Switch>
    </div>
  )
}
