import React, { Component } from 'react';
import style from './Logout.css';

class Logout extends Component {

// makes the user logout using turrinary opperators that pass true and false values onclick
  render() {
    return (
      <div>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}
export default Logout;
