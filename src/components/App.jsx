import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import StopPointsSearch from './StopPointsSearch.jsx';
import StopPoint from './StopPoint.jsx';
import Routes from './Routes.jsx';
import SelectedRoute from './Route.jsx';
import './App.css';

class App extends Component {
   render() {
      return (
         <main>
            <menu>
            <Link to={`/`}>Stop points</Link>
            <Link to={`/routes`}>Routes</Link>
            </menu>
            <Switch>
               <Route exact path="/" component={StopPointsSearch} />
               <Route path="/stop_point/:stop_id" component={StopPoint} />
               <Route path="/routes/:route_id" component={SelectedRoute} />
               <Route path="/routes" component={Routes} />
            </Switch>
         </main>
      )
   }
}
export default App;