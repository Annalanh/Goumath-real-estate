import React, { Suspense, lazy } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/customs/PrivateRoute'
import AdminRoute from './components/customs/AdminRoute'
import LoginPage from './components/auth/Login'
import SignupPage from './components/auth/Signup'
import HomePage from './components/pages/HomePage'
import FilterREPage from './components/pages/FilterREPage'
import SellRentPostDetailPage from './components/pages/SellRentPostDetailPage'
import NeedBuyRentPostDetailPage from './components/pages/NeedBuyRentPostDetailPage'
import ManagePostsPage from './components/pages/ManagePostsPage'
import NewSellRentPostPage from './components/pages/NewSellRentPostPage'
import NewNeedBuyRentPostPage from './components/pages/NewNeedBuyRentPostPage'
import UpdateSellRentPostPage from './components/pages/UpdateSellRentPostPage'
import UpdateNeedBuyRentPostPage from './components/pages/UpdateNeedBuyRentPostPage'
import SavedSellRentPostsPage from './components/pages/SavedSellRentPostsPage'
import SavedNeedBuyRentPostsPage from './components/pages/SavedNeedBuyRentPostsPage'
import CalculateLoanPage from './components/pages/CalculateLoanPage'
import ProfilePage from './components/pages/ProfilePage'
import AdminPage from './components/pages/AdminPage'
import PredictPricePage from './components/pages/PredictPricePage'
import StatisticPage from './components/pages/StatisticPage'
import ErrorPage from './components/pages/Error'

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <>
        <BrowserRouter forceRefresh={true}>
          <Switch>
            <Suspense fallback={<div>Loading...</div>}>
              <Route exact path="/login" component={LoginPage}/>
              <Route exact path="/signup" component={SignupPage}/>
              <Route exact path="/error" component={ErrorPage}/>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/search" component={FilterREPage}/>
              <Route exact path="/predict" component={PredictPricePage}/>
              <Route exact path="/statistic" component={StatisticPage}/>
              
              <PrivateRoute exact path="/profile" component = {ProfilePage}/>
              <PrivateRoute exact path="/manage-posts" component={ManagePostsPage}/>
              <PrivateRoute exact path="/manage-posts/create/sell-rent" component={NewSellRentPostPage}/>
              <PrivateRoute exact path="/manage-posts/create/need-buy-rent" component={NewNeedBuyRentPostPage}/>
              <PrivateRoute exact path="/manage-posts/update/sell-rent/:postId" component={UpdateSellRentPostPage}/>
              <PrivateRoute exact path="/manage-posts/update/need-buy-rent/:postId" component={UpdateNeedBuyRentPostPage}/>
              <PrivateRoute exact path="/saved-sell-rent-posts" component={SavedSellRentPostsPage}/>
              <PrivateRoute exact path="/saved-need-buy-rent-posts" component={SavedNeedBuyRentPostsPage}/>
              <Route exact path="/sell-rent-post/detail/:postId" component={SellRentPostDetailPage}/>
              <Route exact path="/need-buy-rent-post/detail/:postId" component={NeedBuyRentPostDetailPage}/>
              <Route exact path="/calculate-loan" component={CalculateLoanPage}/>
              <AdminRoute exact path="/admin" component={AdminPage}/>
            </Suspense>
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
