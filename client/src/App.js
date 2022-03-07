import React, { lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import NavHeader from "./components/NavBar"
import "./App.css"
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {useDispatch} from 'react-redux';
import { toast } from 'react-toastify';
import * as actionType from './store/constants/actionTypes';

const Signin = lazy(() => import('./pages/signin'));
const Registeruser = lazy(() => import('./pages/register'));
const Home = lazy(() => import('./pages/Home'));


const App = (props) => {
  let history = useHistory()
   let dispatch = useDispatch()
  const logout = () => {
    localStorage.removeItem("token")
    dispatch({ type: actionType.LOGOUT });
    toast.success("logged out successfully")
    history.push('/')
    }

 

  let routes = ((props.isAuthenticated) ? <>
    <Switch>
    <Route path='/home' component={Home} />
      <Route path='/' exact component={Home} />
      <Redirect to='/' />
    </Switch>
  </> : <>
    <Switch>
      <Route path='/register' component={Registeruser} />
      <Route path='/login' component={Signin} />
      <Route path='/' exact component={Signin} />
      <Redirect to='/' />
    </Switch>

  </>
    );
  return (
    <>
      {console.log("routes")}
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <NavHeader  logout={logout} />
          {routes}
        </Router>
      </Suspense>
      
    </>
  );
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.isAuthenticated,
  };
};

export default withRouter(connect(mapStateToProps)(App));