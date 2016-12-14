import React, { Component } from 'react';
import LibraryItem from '../LibraryItem/LibraryItem';
import './Library.css';

export default class Library extends Component {
  render() {
    const saved = Object.keys(this.props.saved)
      .map((i, ind) => (
        <LibraryItem
          key={ind}
          name={this.props.saved[i].name}
          id={this.props.saved[i].id}
          setgraph={this.props.setgraph}
          deleteExercise={this.props.deleteExercise}
        />
    ));
    return (
      <div>
        {saved}
      </div>
    );
  }
}
