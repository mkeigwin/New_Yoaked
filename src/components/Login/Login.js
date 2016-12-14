import React, { Component } from 'react';
import style from './Login.css';

// create a React Component called _App_
class Login extends Component {

  render() {

// attributed to rafa
    return (
      <div>
        { this.props.hideLogin ? <div>
          <button onClick={this.props.loginDisplay}>Login!</button>
        </div> : null }
        { this.props.displayLogin ? <div>
          <button onClick={this.props.handleFormSubmit}>
            Log In!
          </button>
          <input className="reSize"
            type="text"
            placeholder="username"
            value={this.props.logInUsername}
            onChange={this.props.updateFormUsername}
          />
          <input className="reSize"
            type="password"
            placeholder="password"
            value={this.props.logInPassword}
            onChange={this.props.updateFormPassword}
          />
        </div> : null }
      </div>
    );
  }
}

export default Login;
