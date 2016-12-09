import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {
  render() {
    return (
      <div>
        <input type="number" name="weight" min="0" value={this.props.holderWt} placeholder={this.props.weight} onChange={this.props.updateWt} />
        <button onClick={() => this.props.enterWt()}>Update Weight</button>
      </div>
    );
  }
}
