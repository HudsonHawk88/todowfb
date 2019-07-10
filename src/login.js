import React, { Component } from 'react';
import firebase, { } from './config/Fire';
import * as firebaseui from 'firebaseui';
import Home from './home'

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginGoogle = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
      user: null
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login() {
    var uiConfig ={
    signInSuccessUrl: <Home />,
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.PhoneAuthProvider.PROVIDER_ID,
          
      ],
      // Other config options...
    }
  
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#root', uiConfig);
  }


  render() {
    return (
      <div className="wrapper">
        {this.login()}         
    </div>
    );
  }
}


export default Login;
