import React, { Component } from 'react';
import './ExerciseItem.css';

export default class ExerciseItem extends Component {

  render() {
    return (
      <div>
        <h4>{this.props.name}</h4>
        <p>{this.props.desc}</p>
      </div>
    );
  }
}
        // <div className="buttonz">
        // <button onClick={this.props.editCanvas}>Edit</button>
        // <button onClick={this.props.deleteCanvas}>Delete</button>
        // </div>
