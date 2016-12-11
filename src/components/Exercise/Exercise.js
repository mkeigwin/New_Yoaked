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
          img1={this.props.exercises[exID].image1}
          id={this.props.exercises[exID].id}
          saveExercise={this.props.saveExercise}
        />
    ));
    return (
      <div>
        {exercise}
      </div>
    );
  }
}
