import React, { Component } from 'react';
import ListItem from '../ListItem/ListItem';
import './List.css';

export default class List extends Component {
  render() {
    const list = Object.keys(this.props.lists)
      .map((i, ind) => (
        <ListItem
          key={ind}
          name={this.props.lists[i].name}
          setType={this.props.setType}
          // editCanvas={() => this.props.editCanvas(this.props.drawings[canvID].id)}
          // deleteCanvas={() => this.props.deleteCanvas(this.props.drawings[canvID].id)}
        />
    ));
    return (
      <div>
        {list}
      </div>
    );
  }
}
