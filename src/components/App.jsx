import React, { Component } from 'react';
import SignUp from './SignUp/SignUp.js';
import Login from './Login/Login.js';
import Form from './Form/Form.jsx';
import Exercise from './Exercise/Exercise';
import List from './List/List';
import Logout from './Logout/Logout';
import { LineChart } from 'react-d3';
// import AjaxFunctions from '../helpers/AjaxFunctions';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      holderWt: 'my weight',
      weight: 'my weight',
      exercises: {
        'back': [{ name: 'yolo', description: 'hey hey hey' }, { name: 'what-up', description: 'is this working' }],
        'chest': [{ name: 'yolo', description: 'hey hey hey' }, { name: 'what-up', description: 'is this working' }],
      },
      lists: [
        { name: 'back' },
        { name: 'chest' },
        { name: 'shoulder' },
        { name: 'bi' },
        { name: 'tri' },
        { name: 'leg' },
        { name: 'ab' },
      ],
      type: 'default default default',
      date: '',
      lineData: [
        {
          name: 'series1',
          values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
          strokeWidth: 3,
          strokeDashArray: "5,5",
          shapeColor: "red",
        },
        {
          name: 'series2',
          stroke: '#FFFFFF',
          values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ],
        },
        {
          name: 'series3',
          values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ],
        },
        {
          name: 'series4',
          values: [ { x: 0, y: 0 }, { x: 1, y: 3 }, { x: 2, y: 12 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 7 }, { x: 6, y: 6 } ],
        },
        {
          name: 'series5',
          values: [ { x: 0, y: 3 }, { x: 1, y: 4 }, { x: 2, y: 5 }, { x: 3, y: 6 }, { x: 4, y: 7 }, { x: 5, y: 8 }, { x: 6, y: 9 }, { x: 7, y: 3 }, { x: 8, y: 4 }, { x: 9, y: 5 }, { x: 10, y: 6 }, { x: 11, y: 7 }, { x: 12, y: 8 }, { x: 13, y: 9 } ],
        },
      ],
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

  setType(e) {
    console.log('SETTING THE FUCK OUT OF THIS ' + e.target.value)
    this.setState({
      type: e.target.value,
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
  check() {
    console.log(this.state.type)
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
          setType={(e) => this.setType(e)}
        />
        <Exercise
          exercises={this.state.exercises}
        />
        <LineChart
          legend={true}
          data={this.state.lineData}
          width={500}
          height={400}
          viewBoxObject={{
            x: 0,
            y: 0,
            width: 500,
            height: 400,
          }}
          title="Line Chart"
          yAxisLabel="Altitude"
          xAxisLabel="Elapsed Time (sec)"
          gridHorizontal={true}
        />
        <button onClick={this.check.bind(this)}>click me</button>
      </div>
    );
  }
}

