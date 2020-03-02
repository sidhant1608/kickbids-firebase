import React from 'react';
import { AuthUserContext } from '../Session';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import SignOutButton from '../SignOut';


const SideDrawer = (props) => {
    let classname;
    if(props.show){
        classname="side-drawer open"
    }
    else{
        classname="side-drawer"
    }
    return (
        <nav className={classname} >
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
    )
};

const NavigationAuth = ({ authUser }) => (

    
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
  );

  const NavigationNonAuth = () => (
      <ul>
        <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  );

export default SideDrawer;