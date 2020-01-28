import React, { Component } from 'react';
import { compose } from 'recompose';

import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
  } from '../Session';import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';

import {createCategory} from "../API/auth";



const CreateCategory = () => {
    return (
        <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <AddCategory authUser={authUser} />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
};

class AddCategoryBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          name: '',
          error: false,
          success: false
      };
    }
  
    onSubmit = event => {
    event.preventDefault();

    var name = this.state.name;
    createCategory(this.props.authUser.idToken, {name})
    .then(data => {
      console.log(data);
        if(data.error){
            console.log(data.error);
        } else {
            console.log(data);
            this.setState({
              name: "",
              success: true
            });
        }
      });
    };
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {
      return (
        <div className="container">
          <form onSubmit={this.onSubmit}>
          <div className="form-group">
              <label className="text-muted">
                  Name
              </label>
              <input type="text" 
              name='name'
              className="form-control"
              onChange={this.onChange}
              value={this.state.name}
              autoFocus
              required/>
          </div>
          <div className="form-group">
              <button className="btn btn-outline-primary">
                  Create Category
              </button>
          </div>
      </form>
      </div>
      );
    }
  }

const AddCategory = withFirebase(AddCategoryBase);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(CreateCategory);

export {AddCategory};
