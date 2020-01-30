import React, { Component } from 'react';
import { compose } from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
  } from '../Session';import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';

import {getCategories} from "../API/category";
import {createProduct} from "../API/auth";



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

const INITIAL_STATE = {
  name: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  photo: '',
  photofront: '',
  photoback: '',
  photoleft: '',
  photobottom: '',
  error: false,
  success: false,
  loading: false,
  users: [],
  formData: ''
};

class AddProductBase extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = INITIAL_STATE;
    }

    componentDidMount() {

      this.setState({
        formData: new FormData(),
        loading: true
      });
      getCategories().then(data => {
        if(data.error){
            this.setState({error: true});
        } else {
            this.setState({categories: data,
              loading: false,});
        }
      });
    }


    onSubmit = event => {
    event.preventDefault();

    createProduct(this.props.authUser.idToken, this.state.formData)
    .then(product => {
      console.log(product);
    })
    .catch(error => {
      console.log(error);
    });
    // this.setState(INITIAL_STATE);

  };

    onChange = event => {
      var name = event.target.name;
      var formData = this.state.formData;
      if ( name === 'photo' || name === 'photoback' || name === 'photofront' || name === 'photoleft' || name === 'photobottom'){
          const value = event.target.files[0];
          this.setState({ [event.target.name]: value });
          formData.set(name, value);
      }
      else {
        this.setState({ [name]: event.target.value });
        formData.set(name, event.target.value)
      }
      this.setState({
        formData: formData
      })
    };
  
    render() {
      var categories = this.state.categories;

      return (
        <div className="container">
          <form className="mb-3" onSubmit={this.onSubmit}>
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
              <label className="text-muted">
                  Description
              </label>
              <input type="text" 
              name='description'
              className="form-control"
              onChange={this.onChange}
              value={this.state.description}
              autoFocus
              required/>
          </div>
          <div className="form-group">
              <label className="text-muted">
                  Price
              </label>
              <input type="number" 
              name='price'
              className="form-control"
              onChange={this.onChange}
              value={this.state.price}
              autoFocus
              required/>
          </div>
          <div className="form-group">
            <label className="text-muted">Category</label>
            <select 
            onChange={this.onChange}
            name='category'
            className="form-control">
            <option>Select A Category</option>
            {categories && categories.map((category, i) =>(
                <option key={i} value={category._id}>{category.name}</option>
            ))}
            </select>
          </div>
          <div className="form-group">
                    <label className="text-muted mr-2">Choose Right Photo</label>
                    <label className="btn btn-outline-secondary">
                    <input onChange={this.onChange}
                    type="file" 
                    name="photo" 
                    accept="image/*" multiple></input>
                    </label>
                </div>
                <div className="form-group">
                    <label className="text-muted mr-2">Choose Left Photo</label>
                    <label className="btn btn-outline-secondary">
                    <input onChange={this.onChange}
                    type="file" 
                    name="photoleft" 
                    accept="image/*"></input>
                    </label>
                </div>
                <div className="form-group">
                    <label className="text-muted mr-2">Choose Front Photo</label>
                    <label className="btn btn-outline-secondary">
                    <input onChange={this.onChange}
                    type="file" 
                    name="photofront" 
                    accept="image/*"></input>
                    </label>
                </div>
                <div className="form-group">
                    <label className="text-muted mr-2">Choose Back Photo</label>
                    <label className="btn btn-outline-secondary">
                    <input onChange={this.onChange}
                    type="file" 
                    name="photoback" 
                    accept="image/*"></input>
                    </label>
                </div>
                <div className="form-group">
                    <label className="text-muted mr-2">Choose Bottom Photo</label>
                    <label className="btn btn-outline-secondary">
                    <input onChange={this.onChange}
                    type="file" 
                    name="photobottom" 
                    accept="image/*"></input>
                    </label>
                </div>
          <div className="form-group">
              <button className="btn btn-outline-primary">
                  Create Product
              </button>
          </div>
      </form>
    </div>
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
