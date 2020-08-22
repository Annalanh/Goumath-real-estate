import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../../utils/auth' 

const PrivateRoute = function ({ component: Component, ...rest}){
  return (
    <Route {...rest} 
      render={props => isLogin()
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location} }}/>}
    />
  )
}

export default PrivateRoute;