import React, { Component } from 'react';
import LibraryForm from '../LibraryForm/LibraryForm';
import './LibraryItem.css';

export default class LibraryItem extends Component {
  constructor() {
    super();
    this.state = {
      placeReps: "enter reps",
      placeLbs: "enter weight",
      holderReps: '',
      holderLbs: '',
      max: '',
      holderText: '',
    };
  }
  updateReps(e) {
    this.setState({
      holderReps: e.target.value,
    });
  }
  updateLbs(e) {
    this.setState({
      holderLbs: e.target.value,
    });
  }
  enterData() {
    if ((this.state.holderReps.length !== 0) && (this.state.holderLbs.length !== 0)) {
      const coefficients = [1, (943 / 1000), (906 / 1000), (881 / 1000), (856 / 1000), (831 / 1000), (807 / 1000), (786 / 1000), (765 / 1000), (744 / 1000), (723 / 1000), (703 / 1000), (688 / 1000), (675 / 1000), (662 / 1000), (650 / 1000), (638 / 1000), (627 / 1000), (616 / 1000), (606 / 1000)];
      const repCount = this.state.holderReps - 1;
      const weightZ = this.state.holderLbs;
      const coef = coefficients[repCount];
      const onrepMax = Math.floor(weightZ / coef);
      this.setState({
        placeReps: this.state.holderReps,
        placeLbs: this.state.holderLbs,
        max: onrepMax,
        holderText: 'Your one rep max is ',
        holderText2: ', click graph to save and view',
      });
    }
  }
  render() {
    return (
      <div>
        <h2 className="libTitle">{this.props.name}</h2>
        <h4>{this.state.holderText}{this.state.max}{this.state.holderText2}</h4>
        <LibraryForm
        placeReps={this.state.placeReps}
        placeLbs={this.state.placeLbs}
        updateReps={this.updateReps.bind(this)}
        updateLbs={this.updateLbs.bind(this)}
        enterData={this.enterData.bind(this)}
        />
        <div className="morebtns">
          <button id={this.props.id} name={this.props.name} value={this.state.max} onClick={this.props.setgraph}>Graph</button>
          <button id={this.props.name} value={this.props.id} onClick={this.props.deleteExercise}>Delete From Saved</button>
        </div>
      </div>
    );
  }
}
