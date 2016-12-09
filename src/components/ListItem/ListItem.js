import React, { Component } from 'react';
import './ListItem.css';

export default class ListItem extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}
