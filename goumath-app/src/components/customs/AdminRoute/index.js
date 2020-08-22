import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin, getUserRole } from '../../../utils/auth';


const AdminRoute = function ({ component: Component, ...rest}){
  console.log(rest)
    if(isLogin()){
        if(getUserRole() === 'admin') return <Route {...rest} render={props => <Component {...props} />} />
        else return <Route {...rest} render={props => <Redirect to='/error' />}/>
    }else return <Route {...rest} render={props => <Redirect to={{pathname: '/login', state: {from: props.location} }}/>}/> 
  }

export default AdminRoute;