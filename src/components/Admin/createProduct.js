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

const INITIAL_STATE = {
  name: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  photo: '',
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
        formData: new FormData()
      });

      this.setState({ loading: true });
      this.unsubscribe = this.props.firebase
        .categories()
        .onSnapshot(snapshot => {
          let categories = [];
          snapshot.forEach(doc =>
            categories.push({ ...doc.data(), uid: doc.id }),
          );
          this.setState({
            categories: categories,
            loading: false,
          });
        });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    onSubmit = event => {
    event.preventDefault();

    var data = {
      name: this.state.name,
      userId: this.props.firebase.user(this.props.authUser.uid),
      description: this.state.description,
      price: this.state.price,
      category: this.props.firebase.category(this.state.category),
      created: this.props.firebase.fieldValue.serverTimestamp()
    }
    var product = this.props.firebase.products().doc();
    // var productRef = storageRef.child(`images/products//mountains.jpg`);
    
    // product.set(data)
    // .then(() => {
    //   console.log("Product Added");
    // });
    this.setState(INITIAL_STATE);

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
                <option key={i} value={category.uid}>{category.name}</option>
            ))}
            </select>
          </div>
          <div className="form-group">
                    <label className="text-muted mr-2">Choose Photo</label>
                    <label className="btn btn-outline-secondary">
                    <input onChange={this.onChange}
                    type="file" 
                    name="photo" 
                    accept="image/*" multiple></input>
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
