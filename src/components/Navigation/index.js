import React from 'react';
import { Link } from 'react-router-dom';


import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import ToggleButton from "./DrawerToggleButton";

import "./navigation.css";
import ToggleButtom from './DrawerToggleButton';

const Navigation = (props) => (


  <header className="navbar">
      <nav className="navbar-container">
          <div>
            <ToggleButtom click={props.drawerClickHandler}/>
          </div>
          <div className="navbar-logo">
            <a href="/" >KICKBIDS</a>
          </div>
          <div className="navbar-seperator"/>
          <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <NavigationAuth authUser={authUser} />
            ) : (
              <NavigationNonAuth />
            )
          }
        </AuthUserContext.Consumer>
      </nav>
  </header>
);

const NavigationAuth = ({ authUser }) => (

  <div className="navbar-list-container">
    <ul>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {authUser.roles[ROLES.ADMIN] === ROLES.ADMIN && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        <li>
          <SignOutButton />
        </li>
    </ul>
  </div>
);

const NavigationNonAuth = () => (
  <div className="navbar-list-container">
    <ul>
      <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
  </div>
);

export default Navigation;
