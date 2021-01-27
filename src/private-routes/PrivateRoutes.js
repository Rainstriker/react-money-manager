import React, { useEffect } from 'react';
import NavBar from '../components/NavBar/NavBar';
import ConfigRoutes from '../config/routes';
import { Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';

const PrivateRoutes = props => {
  const role = props.role || 'guest';

  const allowedRoutes = ConfigRoutes[role].allowedRoutes;
  const redirectRoute = ConfigRoutes[role].redirectRoutes;

  return (
    <BrowserRouter>
      <NavBar role={role} setRole={props.setRole}/>
      <Switch>
        {allowedRoutes.map(route => (
          <Route
            path={route.url}
            key={route.url}
            exact
          >
            <route.component setRole={props.setRole} />
          </Route>
        ))}
        <Redirect to={redirectRoute} />
      </Switch>
    </BrowserRouter>
  );
}

export default PrivateRoutes;