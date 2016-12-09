import React, { Component } from 'react';
import SignUp from './SignUp/SignUp.js';
import Login from './Login/Login.js';
import Form from './Form/Form.jsx';
import Exercise from './Exercise/Exercise';
import List from './List/List';
import Logout from './Logout/Logout';
// import AjaxFunctions from '../helpers/AjaxFunctions';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      holderWt: 'my weight',
      weight: 'my weight',
      exercises: [
        { name: 'yolo', description: 'hey hey hey' },
        { name: 'what-up', description: 'is this working' },
      ],
      lists: [
        { name: 'back' },
        { name: 'chest' },
      ],
      date: '',
    };
  }
  componentDidMount() {
// parts of the date are attricuted to this link
// http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    const full = `${mm}/${dd}/${yyyy}`;
    this.setState({
      date: full,
    });
  }

  updateWt(e) {
    this.setState({
      holderWt: e.target.value,
    });
  }

  enterWt() {
    this.setState({
      weight: this.state.holderWt,
    });
  }

  render() {
    const noteColor = {
      color: 'red',
    };
    return (
      <div>
        <SignUp />
        <Login />
        <Logout />
        <h3>{this.state.date}</h3>
        <h1 style={noteColor}>New Yoaked</h1>
        <Form
          updateWt={(e) => this.updateWt(e)}
          enterWt={this.enterWt.bind(this)}
          holderWt={this.state.holderWt}
          weight={this.state.weight}
        />
        <List
          lists={this.state.lists}
        />
        <Exercise
          exercises={this.state.exercises}
          // editCanvas={(id) => this.editCanvas(id)}
          // deleteCanvas={(id) => this.deleteCanvas(id)}
        />
      </div>
    );
  }
}
