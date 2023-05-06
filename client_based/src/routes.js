import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';


export const renderRoutes = (routes = []) => (

  <Suspense fallback={<Loader />}>
    <Switch>


      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>}
          />
        );
      })}
        <Redirect to='/auth/signin-1'/>
    </Switch>
  </Suspense>
);

