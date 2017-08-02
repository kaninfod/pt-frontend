import React from 'react';
import { connect } from "react-redux";
import { logout, login } from '../redux/auth'
import '../stylesheets/login'

@connect((store) => {
  return {
    auth: store.nAuth.get('user'),
  };
})
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.emailChanged = this.emailChanged.bind(this);
    this.passwordChanged = this.passwordChanged.bind(this);
    this.state = {
      email: "admin@mail.com",
      password: "123"
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.remember_token) {
      this.props.history.push('/albums/list');
    }
  }

  handleLogout() {
    this.props.dispatch(logout())
  }

  handleLogin() {
    this.props.dispatch(login({
      email: this.state.email,
      password: this.state.password,
      redirectURL: this.props.redirectURL
    }))
  }

  emailChanged(event) {
    this.setState(
      { email: event.target.value}
    )
  }

  passwordChanged(event) {

    this.setState(
      { password: event.target.value}
    )  }

  render() {
    return (

      <div class="row login-card">
        <div class="col s12 m6 ">
          <div class="card ">

            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input id="email"  value={this.state.email} onChange={this.emailChanged} type="text" class="validate"/>
                <label for="email">email</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <i class="material-icons prefix">account_circle</i>
                <input id="password" value={this.state.password} onChange={this.passwordChanged} type="password" class="validate"/>
                <label for="password">Password</label>
              </div>
            </div>
            <div class="row">
              <button class="btn waves-effect waves-light" type="submit" onClick={this.handleLogin}>Login
               <i class="material-icons right">send</i>
             </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
