import React, { Component } from 'react';
// import style from './Signup.css';

export default class Signup extends Component {
  render() {
    return(
      <div>
        { this.props.hideSignup ? <div>
          <button onClick={this.props.SignupDisplay}>Sign up</button>
        </div> : null }
        { this.props.displaySignup ? <div className="btz">
          <div>
            <button onClick={this.props.switchToLogin}>Login</button>
            <button className="signUpColor" onClick={this.props.postSignup}>Sign up</button>
          </div>
          <div>
            <input onChange={this.props.trackSignupForm} type="text" placeholder="username"/>
            <input onChange={this.props.trackSignupForm} type="password" placeholder="password"/>
          </div>
        </div> : null }
      </div>
    )
  }
}
