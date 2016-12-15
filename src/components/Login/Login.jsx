import React, { Component } from 'react';
import style from './Login.css';

export default class Login extends Component {
  render() {
    return(
      <div>
        { this.props.hideLogin ? <div>
          <button onClick={this.props.loginDisplay}>Login</button>
        </div> : null }
        { this.props.displayLogin ? <div className="btz">
          <div>
            <button className="loginColor" onClick={this.props.postLogin}>Login</button>
            <button onClick={this.props.switchToSignup}>Sign Up</button>
          </div>
          <div>
            <input onChange={this.props.trackLoginForm} type="text" placeholder="username"/>
            <input onChange={this.props.trackLoginForm} type="password" placeholder="password"/>
          </div>
        </div> : null }
      </div>
    )
  }
}
