import React, { Component } from 'react';
import SignUp from './SignUp/SignUp.js';
import Login from './Login/Login.js';
import Form from './Form/Form.jsx';
import Library from './Library/Library.js';
import Exercise from './Exercise/Exercise';
import List from './List/List';
import Logout from './Logout/Logout';
import { LineChart } from 'react-d3';
import bentRows from '../images/bentrows.png';

// import AjaxFunctions from '../helpers/AjaxFunctions';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      placeWt: 'my weight',
      holderWt: '',
      weight: null,
      days: 2,
      start: '2016-12-9',
      saved: [],
      wow: {
        weight: [{ x: 0, y: 180 }, { x: 1, y: 178 }],
        eleven: [{ x: 0, y: 20 }, { x: 1, y: 30 }],
        twelve: [{ x: 0, y: 20 }, { x: 1, y: 10 }],
        twentyone: [{ x: 0, y: 20 }, { x: 1, y: 30 }],
        twentytwo: [{ x: 0, y: 20 }, { x: 1, y: 10 }],
        thirtyone: [{ x: 0, y: 20 }, { x: 1, y: 30 }],
        thirtytwo: [{ x: 0, y: 20 }, { x: 1, y: 10 }],
        fourtyone: [{ x: 0, y: 20 }, { x: 1, y: 30 }],
        fourtytwo: [{ x: 0, y: 20 }, { x: 1, y: 10 }],
        fiftyone: [{ x: 0, y: 20 }, { x: 1, y: 30 }],
        fiftytwo: [{ x: 0, y: 20 }, { x: 1, y: 10 }],
        sixtyone: [{ x: 0, y: 20 }, { x: 1, y: 30 }],
        sixtytwo: [{ x: 0, y: 20 }, { x: 1, y: 10 }],
        seventyone: [{ x: 0, y: 20 }, { x: 1, y: 30 }],
        seventytwo: [{ x: 0, y: 20 }, { x: 1, y: 10 }],
      },
      exercises: {
        'default': [],
        'Back': [
          { name: 'Bent Over Rowing', description: 'Bend at hips, don\'t arch back, pull weight in towards belly button', id: 'eleven', image1: bentRows },
          { name: 'Chin-ups', description: 'Hang From bar with palms facing the wall behind you, pull chin above bar', id: 'twelve' },
        ],
        'Chest': [
          { name: 'Bench Press', description: 'Align weights over chest, fully extend arms then bring weights down to chest', id: 'twentyone' },
          { name: 'Cable Cross-over', description: 'Have a cable in each hand at shoulder level, seperate and bring hands together while keeping arms straight', id: 'twentytwo' },
        ],
        'Shoulders': [
          { name: 'Lateral Raises', description: 'Hold weights at side, moves arms to horizantal while keeping arms straight', id: 'thirtyone' },
          { name: 'Shoulder Press', description: 'Bring weight to shoulder height, press weight above head', id: 'thirtytwo' },
        ],
        'Bicep': [
          { name: 'Bicep Curl', description: 'Hold weight with palms facing inward, rotate 90deg as you bring them to shoulder while keeping elbow still', id: 'fourtyone' },
          { name: 'Hammercurl', description: 'Hold weight with palms facing inward, bring weights to shoulder while keeping elbows and wrists still', id: 'fourtytwo' },
        ],
        'Tricep': [
          { name: 'Narrow Grip Bench', description: 'Hold bar with straight arms and close grip above chest, bring down to chest while keeping elbows in', id: 'fiftyone' },
          { name: 'Dips', description: 'Hold two narrowly placed and elevated bars, keeping chest up straighten and extend arms while feet are elevated', id: 'fiftytwo' },
        ],
        'Legs': [
          { name: 'Barbell Lunges', description: 'Put weighted bar on shoulders, take step foward and bend back knee to touch floor', id: 'sixtyone' },
          { name: 'Front Squat', description: 'Put weighted bar on front of shoulders, bend knees to 90deg while keeping chest upright and back straight', id: 'sixtytwo' },
        ],
        'Abs': [
          { name: 'Crunch', description: 'lie on back with knees bent to feet flat on floor, without extremity movement, try to bring chin to knees', id: 'seventyone' },
          { name: 'Flutter Kicks', description: 'lie on back with feet elevated a few inches off floor, make small kicking motions while elevated', id: 'seventytwo' },
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
          name: 'Weight',
          values: [{ x: 0, y: 180 }, { x: 1, y: 178 }],
          // strokeWidth: 3,
          // strokeDashArray: "5,5",
        },
      ],
    };
  }
  componentDidMount() {
// date counter taken from this link
// http://stackoverflow.com/questions/12986068/how-to-calculate-number-of-days-between-today-and-given-date
    const today = new Date();
    const startDay = new Date(this.state.start);
    const timeinmilisec = today.getTime() - startDay.getTime();
    const numdays = (Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24)));
// parts of the date are attricuted to this link
// http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
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
      days: numdays,
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
      const weightz = this.state.wow['weight'];
      const arr = this.state.wow;
      if ((weightz[weightz.length - 1]['x']) === this.state.days) {
        weightz.pop();
      }
      const dataPt = parseInt(this.state.holderWt);
      const newPoint = { x: this.state.days, y: dataPt };
      weightz.push(newPoint);
      arr['weight'] = weightz;
      this.setState({
        weight: this.state.holderWt,
        wow: arr,
        lineData: [{ name: 'Weight', values: weightz }],
      });
    } else {
      console.log('enter weight to update');
    }
  }

  graphWt() {

  }

  saveExercise(event) {
    const newStuff = {
      name: event.target.id,
      id: event.target.value,
    };
    const newArray = this.state.saved.slice();
    newArray.push(newStuff);
    this.setState({
      saved: newArray,
    });
  }

  setgraph(e) {
    const walphin = this.state.wow[e.target.id];
    const all = this.state.wow;
    const exName = e.target.name;
    if (e.target.value !== 'NaN') {
      const ORM = parseInt(e.target.value);
      const newPoint = { x: this.state.days, y: ORM };
      if ((walphin[walphin.length - 1]['x']) === this.state.days) {
        walphin.pop();
      }
      walphin.push(newPoint);
      all[e.target.id] = walphin;
      this.setState({
        lineData: [{ name: exName, values: walphin }],
        wow: all,
      });
    } else {
      console.log('enter reps and weight to update graph');
      this.setState({
        lineData: [{ name: exName, values: walphin }],
      });
    }
  }

  tempBackButton() {
    this.setState({
      type: 'default',
    });
  }

  click() {
    console.log(this.state.wow);
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
        <Library
          saved={this.state.saved}
          setgraph={this.setgraph.bind(this)}
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
          title="Workout Progress"
          yAxisLabel="One Rep Max (lbs)"
          xAxisLabel="Time Since You Began Tracking Workout (days)"
          gridHorizontal={true}
        />
        <button onClick={this.click.bind(this)}>click me to check consoles</button>
      </div>
    );
  }
}

