import React, { Component } from 'react';
import {auth, provider} from './config/Fire';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
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
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  
  render() {
    return (
      <div className="wrapper">
        <button onClick={this.login}>Log In</button>              
    </div>
    );
  }
}


export default Login;
