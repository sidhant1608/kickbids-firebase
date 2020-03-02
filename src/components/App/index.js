import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import CreateProduct from "../Admin/createProduct"
import CreateCategory from "../Admin/createCategory"
import Product from "../Product";


import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import NavigationComponent from "../Navigation/NavigationComponent";



import "./app.css";

const App = () => (
  <Router>
    <div className="kickbids">
      <NavigationComponent/>
    <div className="kickbids main">
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.CREATE_PRODUCT} component={CreateProduct}/>
      <Route path={ROUTES.CREATE_CATEGORY} component={CreateCategory}/>
      <Route path={ROUTES.PRODUCT} exact component={Product}/>
      </div>
    </div>
  </Router>
);

export default withAuthentication(App);
