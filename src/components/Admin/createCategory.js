import React, { Component } from 'react';
import { compose } from 'recompose';

import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
  } from '../Session';import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';


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
  
    user = this.props.authUser;
    onSubmit = event => {
    //   const { email } = this.state;
  
    //   this.props.firebase
    //     .doPasswordReset(email)
    //     .then(() => {
    //       this.setState({ ...INITIAL_STATE });
    //     })
    //     .catch(error => {
    //       this.setState({ error });
    //     });
    event.preventDefault();

    var category = this.state.name;
    var cat = this.props.firebase.categories().doc();
    cat.set({
        name: category,
        userId: this.props.firebase.user(this.props.authUser.uid),
        created: this.props.firebase.fieldValue.serverTimestamp()
      });
    this.setState({
        name: ''
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
