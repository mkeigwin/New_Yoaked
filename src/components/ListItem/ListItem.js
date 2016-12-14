import React, { Component } from 'react';
import './ListItem.css';

export default class ListItem extends Component {

  render() {
    return (
      <div className="indList">
        <h2 id={this.props.name} onClick={this.props.setType}>{this.props.name}</h2>
      </div>
    );
  }
}
