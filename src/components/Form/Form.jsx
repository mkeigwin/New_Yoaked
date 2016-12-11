import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {
  render() {
    return (
      <div>
        <input type="number" name="weight" min="0" placeholder={this.props.placeWt} onChange={this.props.updateWt} required/>
        <button onClick={() => this.props.enterWt()}>Update Weight</button>
      </div>
    );
  }
}
