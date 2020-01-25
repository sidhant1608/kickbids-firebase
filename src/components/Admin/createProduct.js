import React, { Component } from 'react';
import { compose } from 'recompose';

import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
  } from '../Session';import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';


const CreateProduct = () => {
    return (
        <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <AddProduct authUser={authUser} />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
};

class AddProductBase extends Component {
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
    event.preventDefault();
    var category = this.state.name;
    console.log(this.props.firebase)
    var product = this.props.firebase.products().doc()
    product.set({
        name: category,
        userId: this.props.authUser.uid,
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
      );
    }
  }

const AddProduct = withFirebase(AddProductBase);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(CreateProduct);

export {AddProduct};
