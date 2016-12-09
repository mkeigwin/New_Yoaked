import React, { Component } from 'react';
import ExerciseItem from '../ExerciseItem/ExerciseItem';
import './Exercise.css';

export default class Exercise extends Component {
  render() {
    const exercise = Object.keys(this.props.exercises)
      .map((exID, ind) => (
        <ExerciseItem
          key={ind}
          name={this.props.exercises[exID].name}
          desc={this.props.exercises[exID].description}
          // editCanvas={() => this.props.editCanvas(this.props.drawings[canvID].id)}
          // deleteCanvas={() => this.props.deleteCanvas(this.props.drawings[canvID].id)}
        />
    ));
    return (
      <div>
        {exercise}
      </div>
    );
  }
}
