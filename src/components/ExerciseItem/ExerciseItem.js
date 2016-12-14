import React, { Component } from 'react';
import './ExerciseItem.css';

export default class ExerciseItem extends Component {

  render() {
    return (
      <div>
        <h4>{this.props.name}</h4>
        <p>{this.props.desc}</p>
        <img src={this.props.img1} />
        <button id={this.props.name} value={this.props.id} onClick={this.props.saveExercise}>Save</button>
      </div>
    );
  }
}
