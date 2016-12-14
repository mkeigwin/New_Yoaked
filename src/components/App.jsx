import React, { Component } from 'react';
import SignUp from './SignUp/SignUp.js';
import Login from './Login/Login.js';
import Form from './Form/Form.jsx';
import Library from './Library/Library.js';
import Exercise from './Exercise/Exercise';
import List from './List/List';
import Logout from './Logout/Logout';
import { LineChart } from 'react-d3';
import AjaxFunctions from '../helpers/AjaxFunctions';
import bentRows from '../images/bentrows.png';

// import AjaxFunctions from '../helpers/AjaxFunctions';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      signup: {
        username: '',
        password: '',
      },
      login: {
        loggedIn: false,
        username: '',
        password: '',
      },
      notification:"",

      hideComponent: true,
      hidelogs: false,
      // hideComponent: false,
      // hidelogs: true,

      LibraryShow: true,
      exerciseShow:false,
      displayLogin: false,
      displaySignup: false,
      hideLogin: true,
      hideSignup: true,
      displaylogout: false,
      placeWt: 'my weight',
      holderWt: '',
      weight: null,
      days: NaN,
      start: '2016,12,9',
      // start: 'none',
      saved: [],
      wow: {
        weight: [{ x: 0, y: 180 }, { x: 1, y: 178 }, { x: 2, y: 182 }],
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
      ],
    };
  }
  componentDidMount() {
    this.handleAjaxGetAll().then(() => {
  // PARTS of date counter taken from this link
  // http://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates-using-javascript
      const oneDay = 24*60*60*1000;
      const getToday = new Date();
      const todayDate = `${getToday.getFullYear()},${getToday.getMonth() + 1},${getToday.getDate()}`;
      const firstDate = new Date(todayDate);
      const secondDate = new Date(this.state.start);
      const numdays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
      if (isNaN(numdays)) {
        this.setState({
          days: 0,
        });
      } else {
        this.setState({
          days: numdays,
        });
      }
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
        lineData: [{ name: 'Weight', values: this.state.wow['weight'] }],
      });
      if (this.state.start === 'none') {
        const getStart = new Date();
        const setStart = `${getStart.getFullYear()},${getStart.getMonth() + 1},${getStart.getDate()}`;
        this.setState({
          start: setStart,
        });
      }
    })
    .catch(err => console.log(err));
  }

  setType(e) {
    this.setState({
      type: e.target.id,
      LibraryShow: false,
      exerciseShow: true,
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
      const exData = {
        start:this.state.start,
        wow:this.state.wow,
        username:this.state.login.username,
        saved:this.state.saved,
      };
      AjaxFunctions.postExercise(exData);
    } else {
      console.log('enter weight to update');
    }
  }

  saveExercise(event) {
    const newStuff = {
      name: event.target.id,
      id: event.target.value,
    };
    let exists = true;
    const allSaved = this.state.saved;
    allSaved.forEach((item) => {
      if (newStuff.id === item.id) {
        exists = false;
      }
    });
    if (exists) {
      const newArray = this.state.saved.slice();
      newArray.push(newStuff);
      this.setState({
        saved: newArray,
      });
      const exSave = {
        start:this.state.start,
        wow:this.state.wow,
        username:this.state.login.username,
        saved:this.state.saved,
      };
      AjaxFunctions.postExercise(exSave);
    }
  }

  deleteExercise(event) {
    const savedArr = this.state.saved;
    const index = savedArr.findIndex(x => x.id === event.target.value);
    savedArr.splice(index, 1);
    this.setState({
      saved: savedArr,
    });
    const dSave = {
      start:this.state.start,
      wow:this.state.wow,
      username:this.state.login.username,
      saved:this.state.saved,
    };
    AjaxFunctions.postExercise(dSave);
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
      const exGraph = {
        start:this.state.start,
        wow:this.state.wow,
        username:this.state.login.username,
        saved:this.state.saved,
      };
      AjaxFunctions.postExercise(exGraph);
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
      LibraryShow: true,
      exerciseShow: false,
    });
  }

  updateFormSignUpUsername(e) {
    this.setState({
      signup: {
        username: e.target.value,
        password: this.state.signup.password,
      },
    });
  }
  updateFormSignUpPassword(e) {
    this.setState({
      signup: {
        username: this.state.signup.username,
        password: e.target.value,
      },
    });
  }
  updateFormLogInUsername(e) {
    this.setState({
      login: {
        username: e.target.value,
        password: this.state.login.password,
      },
    });
  }
  updateFormLogInPassword(e) {
    this.setState({
      login: {
        username: this.state.login.username,
        password: e.target.value,
      },
    });
  }
//signs up a new user by adding them to the database
  handleSignUp() {
    let username = this.state.signup.username;
    let password = this.state.signup.password;

    AjaxFunctions.signUp(username, password)
    .then(this.setState({
      signup: {
        username: '',
        password: '',
      },
      displayLogin: false,
      hideLogin: true,
      displaySignup: false,
      hideSignup: true,
    }))
    .catch(err => console.log(err));
  }
//empties the state after user login
  logout() {
    this.setState({
      login: {
        loggedIn: false,
      },
      displayLogin: false,
      hideLogin: true,
      displaySignup: false,
      hideSignup: true,
      hideComponent: false,
    });
  }
//logs out user with fetch to database with their username
  handleLogIn() {
    let username = this.state.login.username;
    let password = this.state.login.password;

    AjaxFunctions.logIn(username, password)
      .then(userData => {
        if (userData.password === false) {
          this.setState({
            notification: 'INVALID USERNAME AND PASSWORD COMBINATION',
            displayLogin: false,
            hideLogin: true,
            displaySignup: false,
            hideSignup: true,
          });
        } else {
          console.log('logged in');
          this.setState({
            notification: '',
            hidelogs:false,
            hideComponent: true,
            displayLogin: false,
            hideLogin: true,
            displaySignup: false,
            hideSignup: true,
            displaylogout: true,
          });
          this.handleAjaxGetAll();
        }
      })
      .catch(err => console.log(err));
  }

  handleAjaxGetAll() {
    return AjaxFunctions.getExercise()
      .then(exercise => {
        const length = (exercise.length - 1);
        if (length >= 0) {
          const newWow = JSON.parse(exercise[length].wow);
          const newSaved = JSON.parse(exercise[length].saved);
          this.setState({
            start: exercise[length].start,
            wow: newWow,
            saved: newSaved ? newSaved : [],
          });
        }
      });
  }
  switchToSignup() {
    this.setState({
      displayLogin: false,
      displaySignup: true,
    });
  }

  switchToLogin() {
    this.setState({
      displayLogin: true,
      displaySignup: false,
    });
  }

//get all drawungs and sets all the drawings to the array
  loginDisplay() {
    this.setState({ displayLogin: true, hideLogin: false, displaySignup: false, hideSignup: false });
  }
//onclick the login button, inputs appear by using boolean values
  SignupDisplay() {
    this.setState({ displaySignup: true, hideSignup: false, displayLogin: false, hideLogin: false });
  }

  click() {
    const yay = this.state.saved;
    console.log('this is state', yay);
  }

  render() {
    return (
      <div>
        <div className="titleDisplay">
          <div className="logo flip"></div>
          <h1 className="title">New Yoaked</h1>
          <div className="logo"></div>
        </div>
        <h3 className="date">{this.state.date}</h3>
        {this.state.hidelogs ? <div className="logs">
          <div className="logBorder">
            <SignUp
              signUpUsername={this.state.signup.username}
              signUpPassword={this.state.signup.password}
              updateFormUsername={event => this.updateFormSignUpUsername(event)}
              updateFormPassword={event => this.updateFormSignUpPassword(event)}
              handleFormSubmit={() => this.handleSignUp()}
              displaySignup={this.state.displaySignup}
              hideSignup={this.state.hideSignup}
              SignupDisplay={this.SignupDisplay.bind(this)}
              switchToLogin={this.switchToLogin.bind(this)}
            />
            <Login
              className={this.state.login.loggedIn ? 'hidden' : ''}
              logInUsername={this.state.login.username}
              logInPassword={this.state.login.password}
              updateFormUsername={event => this.updateFormLogInUsername(event)}
              updateFormPassword={event => this.updateFormLogInPassword(event)}
              handleFormSubmit={() => this.handleLogIn()}
              displayLogin={this.state.displayLogin}
              hideLogin={this.state.hideLogin}
              loginDisplay={this.loginDisplay.bind(this)}
              switchToSignup={this.switchToSignup.bind(this)}
            />
          </div>
        </div> : null}
        {this.state.hideComponent ? <div>
          <Logout
            displaylogout={this.state.displaylogout}
            logout={this.logout.bind(this)}
          />
        <h2>{this.state.notification}</h2>
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
          <main>
            <div className="left">
              {this.state.exerciseShow ? <div>
                <Exercise
                  saveExercise={(e) => this.saveExercise(e)}
                  exercises={this.state.exercises[this.state.type]}
                />
                <button onClick={this.tempBackButton.bind(this)}>Show Library</button>
              </div> : null}
              {this.state.LibraryShow ? <div>
                <Library
                  saved={this.state.saved}
                  setgraph={this.setgraph.bind(this)}
                  deleteExercise={(e) => this.deleteExercise(e)}
                />
              </div> : null}
            </div>
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
          </main>
          <button onClick={this.click.bind(this)}>TEMP CONSOLE CHECK</button>
        </div> : null}
      </div>
    );
  }
}
