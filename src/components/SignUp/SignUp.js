import React, { Component } from 'react';
import style from './SignUp.css';

class SignUp extends Component {

  render() {
// attributed to rafa
    return (
      <div>
        { this.props.hideSignup ? <div>
          <button onClick={this.props.SignupDisplay}>SignUp!</button>
        </div> : null }
        { this.props.displaySignup ? <div>
          <div className="btz">
            <button className="signUpColor" onClick={this.props.handleFormSubmit}>SignUp!</button>
            <button onClick={this.props.switchToLogin}>Login !</button>
          </div>
          <div className="posRel">
            <input className="reSize"
              type="text"
              placeholder="username"
              value={this.props.signUpUsername}
              onChange={this.props.updateFormUsername}
            />
            <input className="reSize"
              type="password"
              placeholder="password"
              value={this.props.signUpPassword}
              onChange={this.props.updateFormPassword}
            />
          </div>
        </div> : null }
      </div>
    );
  }
}

export default SignUp;
