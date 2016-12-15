import React, { Component } from 'react';
import style from './Logout.css';

class Logout extends Component {

  render() {
    return (
      <div className="logout">
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}
export default Logout;
