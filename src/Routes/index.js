import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Route from './Route'

import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
      </Switch>
    </Router>
  );
}

export default Routes;
