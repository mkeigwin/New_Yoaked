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
      placeWt: 'my weight',
      holderWt: '',
      weight: null,
      saved: [],
      wow: {
        'eleven':[{ x: 0, y: 20 }, { x: 1, y: 30 }],
        'twelve':[{ x: 0, y: 20 }, { x: 1, y: 30 }],
      },
      exercises: {
        'default': [],
        'Back': [
          { name: 'Bent Over Rowing', description: 'Bend at hips, don\'t arch back, pull weight in towards belly button', id: 'eleven', image1: '../../Public/images/bentrows.png' },
          { name: 'Chin-ups', description: 'Hang From bar with palms facing the wall behind you, pull chin above bar', id: 'twelve' },
        ],
        'Chest': [
          { name: 'Bench Press', description: 'Align weights over chest, fully extend arms then bring weights down to chest', id: 21 },
          { name: 'Cable Cross-over', description: 'Have a cable in each hand at shoulder level, seperate and bring hands together while keeping arms straight', id: 22 },
        ],
        'Shoulders': [
          { name: 'Lateral Raises', description: 'Hold weights at side, moves arms to horizantal while keeping arms straight', id: 31 },
          { name: 'Shoulder Press', description: 'Bring weight to shoulder height, press weight above head', id: 32 },
        ],
        'Bicep': [
          { name: 'Bicep Curl', description: 'Hold weight with palms facing inward, rotate 90deg as you bring them to shoulder while keeping elbow still', id: 41 },
          { name: 'Hammercurl', description: 'Hold weight with palms facing inward, bring weights to shoulder while keeping elbows and wrists still', id: 42 },
        ],
        'Tricep': [
          { name: 'Narrow Grip Bench', description: 'Hold bar with straight arms and close grip above chest, bring down to chest while keeping elbows in', id: 51 },
          { name: 'Dips', description: 'Hold two narrowly placed and elevated bars, keeping chest up straighten and extend arms while feet are elevated', id: 52 },
        ],
        'Legs': [
          { name: 'Barbell Lunges', description: 'Put weighted bar on shoulders, take step foward and bend back knee to touch floor', id: 61 },
          { name: 'Front Squat', description: 'Put weighted bar on front of shoulders, bend knees to 90deg while keeping chest upright and back straight', id: 62 },
        ],
        'Abs': [
          { name: 'Crunch', description: 'lie on back with knees bent to feet flat on floor, without extremity movement, try to bring chin to knees', id: 71 },
          { name: 'Flutter Kicks', description: 'lie on back with feet elevated a few inches off floor, make small kicking motions while elevated', id: 72 },
        ],
      },
      lists: [
        { name: 'Back' },
        { name: 'Chest' },
        { name: 'Shoulders' },
        { name: 'Bicep' },
        { name: 'Tricep' },
        { name: 'Legs' },
        { name: 'Abs' },
      ],
      type: 'default',
      date: '',
      lineData: [
        {
          name: 'series1',
          values: [{ x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 }],
          strokeWidth: 3,
          strokeDashArray: "5,5",
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
    this.setState({
      type: e.target.id,
    });
  }

  updateWt(e) {
    this.setState({
      holderWt: e.target.value,
    });
  }

  enterWt() {
    if (this.state.holderWt.length !== 0) {
      this.setState({
        weight: this.state.holderWt,
      });
    }
  }

  saveExercise(event) {
    const newStuff = {
      name: event.target.id,
      lib: this.state.wow[event.target.value],
    };
    const newArray = this.state.saved.slice();
    newArray.push(newStuff);
    this.setState({
      saved: newArray,
    });
  }

  tempBackButton() {
    this.setState({
      type: 'default',
    });
  }

  click() {
    console.log(this.state.saved);
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
          placeWt={this.state.placeWt}
        />
        <List
          lists={this.state.lists}
          setType={(e) => this.setType(e)}
        />
        <Exercise
          saveExercise={(e) => this.saveExercise(e)}
          exercises={this.state.exercises[this.state.type]}
        />
        <button onClick={this.tempBackButton.bind(this)}>Wez gonna Goz back</button>
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
        <button onClick={this.click.bind(this)}>click me to check consoles</button>
      </div>
    );
  }
}

