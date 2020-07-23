import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/customs/PrivateRoute'
import AdminRoute from './components/customs/AdminRoute'
import LoginPage from './components/auth/Login'
import SignupPage from './components/auth/Signup'
import HomePage from './components/pages/HomePage'
import FilterREPage from './components/pages/FilterREPage'
import PostDetailPage from './components/pages/PostDetailPage'
import ManagePostsPage from './components/pages/ManagePostsPage'
import NewPostPage from './components/pages/NewPostPage'
import UpdatePostPage from './components/pages/UpdatePostPage'
import SavedPostsPage from './components/pages/SavedPostsPage'
import CalculateLoanPage from './components/pages/CalculateLoanPage'
import ProfilePage from './components/pages/ProfilePage'
import AdminPage from './components/pages/AdminPage'
import PredictPricePage from './components/pages/PredictPricePage'
import StatisticPage from './components/pages/StatisticPage'
import AdminUpdatePostPage from './components/pages/AdminUpdatePostPage'
import ErrorPage from './components/pages/Error'



class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/signup" component={SignupPage}/>
            <Route exact path="/error" component={ErrorPage}/>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/search" component={FilterREPage}/>
            <Route exact path="/predict" component={PredictPricePage}/>
            <Route exact path="/statistic" component={StatisticPage}/>
            <PrivateRoute exact path="/profile" component={ProfilePage}/>
            <PrivateRoute exact path="/manage-posts" component={ManagePostsPage}/>
            <PrivateRoute exact path="/manage-posts/create" component={NewPostPage}/>
            <PrivateRoute exact path="/manage-posts/update" component={UpdatePostPage}/>
            <PrivateRoute exact path="/saved-posts" component={SavedPostsPage}/>
            <Route exact path="/detail" component={PostDetailPage}/>
            <Route exact path="/calculate-loan" component={CalculateLoanPage}/>
            <AdminRoute exact path="/admin" component={AdminPage}/>
            <AdminRoute exact path="/admin/update-post" component={AdminUpdatePostPage}/>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
