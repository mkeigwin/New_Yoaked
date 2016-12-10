import React, { Component } from 'react';
import './ListItem.css';

export default class ListItem extends Component {

  render() {
    return (
      <div>
        <h2 value={this.props.name} onClick={this.props.setType}>{this.props.name}</h2>
      </div>
    );
  }
}
