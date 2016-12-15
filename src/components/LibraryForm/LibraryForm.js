import React, { Component } from 'react';
import './LibraryForm.css';

export default class LibraryForm extends Component {
  render() {
    return (
      <div>
        <input className="reps4jesus" type="number" min="1" max="20" placeholder={this.props.placeReps} onChange={this.props.updateReps} />
        <input type="number" min="0" placeholder={this.props.placeLbs} onChange={this.props.updateLbs} />
        <button onClick={this.props.enterData}>Calculate</button>
      </div>
    );
  }
}
