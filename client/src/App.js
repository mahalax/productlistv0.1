import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import NavHeader from "./components/NavBar"
import "./App.css"
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
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
      <Route path='/home' render={() => <Home onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} handleClearcart={handleClearcart} />} />
      <Route path='/' exact render={() => <Home onAdd={onAdd} onRemove={onRemove} cartItems={cartItems} handleClearcart={handleClearcart} />} />
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


  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    console.log("on Add called", product)
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  console.log("cart item length : ", cartItems.length, cartItems)
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  const handleClearcart = () => {
    setCartItems([])
  }

  return (
    <>
      {console.log("routes")}
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <NavHeader logout={logout} countCartItems={cartItems.length} />
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