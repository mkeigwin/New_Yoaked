import React, { Component } from 'react';
import Signup from './Signup/Signup.jsx';
import Login from './Login/Login.jsx';
import Form from './Form/Form.jsx';
import Library from './Library/Library.js';
import Exercise from './Exercise/Exercise';
import List from './List/List';
import Logout from './Logout/Logout';
import { LineChart } from 'react-d3';
import AjaxFunctions from '../helpers/AjaxFunctions';
import bentRows from '../images/bentrows.png';
import './App.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      signupForm: {
        username: '',
        password: ''
      },
      loginForm: {
        username: '',
        password: ''
      },
      currentToken: '',
      currentUser: '',
      notification:"",
      hideComponent: false,
      hidelogs: true,
      hideLogin:true,
      hideSignup:true,
      displayLogin:false,
      displaySignup: false,
      LibraryShow: true,
      exerciseShow:false,
      placeWt: 'my weight',
      holderWt: '',
      weight: null,
      days: NaN,

      start: '2016,12,9',
      // start: 'none',

      saved: [],
      // wow: {
      //   weight: [],
      //   eleven: [],
      //   twelve: [],
      //   twentyone: [],
      //   twentytwo: [],
      //   thirtyone: [],
      //   thirtytwo: [],
      //   fourtyone: [],
      //   fourtytwo: [],
      //   fiftyone: [],
      //   fiftytwo: [],
      //   sixtyone: [],
      //   sixtytwo: [],
      //   seventyone: [],
      //   seventytwo: [],
      // },
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
      lineData: [],
    };
  }
  whenLogged() {
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
        lineData: [{ values: [{ x: 24, y: 24 }, { x: 24, y: 16 }, { x: 28, y: 16 }] },
        { values: [{ x: 12, y: 20 }, { x: 14, y: 20 }] },
        { values: [{ x: 18, y: 24 }, { x: 18, y: 16 }, { x: 22, y: 16 }] },
        { values: [{ x: 10, y: 16 }, { x: 10, y: 24 }] },
        { values: [{ x: 30, y: 16 }, { x: 30, y: 24 }, { x: 34, y: 24 }, { x: 34, y: 16 }, { x: 30, y: 16 }] },
        { values: [{ x: 16, y: 16 }, { x: 12, y: 16 }, { x: 12, y: 24 }, { x: 16, y: 24 }] },
        { values: [{ x: 6, y: 20 }, { x: 10, y: 20 }] },
        { values: [{ x: 6, y: 16 }, { x: 6, y: 24 }] },
        { values: [{ x: 4, y: 15 }] }],
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
      }, () => {
        const exData = {
          start:this.state.start,
          wow:this.state.wow,
          user_id:this.state.currentUser,
          saved:this.state.saved,
        };
        AjaxFunctions.postExercise(exData, this.state.currentToken);
      });
    } else {
      this.setState({
        notification: 'enter weight to update',
      });
      setTimeout(() => {
        this.setState({
          notification: '',
        });
      }, 3000);
    }
  }

  postIt() {
    this.setState({
      currentToken: '',
      hideComponent: false,
      hidelogs: true,
      hideLogin:true,
      hideSignup:true,
      displayLogin:false,
      displaySignup: false,
    }, () => {
    });
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
      }, () => {
        const exSave = {
          start:this.state.start,
          wow:this.state.wow,
          user_id:this.state.currentUser,
          saved:this.state.saved,
        };
        AjaxFunctions.postExercise(exSave, this.state.currentToken);
      });
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
      user_id:this.state.currentUser,
      saved:this.state.saved,
    };
    AjaxFunctions.postExercise(dSave, this.state.currentToken);
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
        user_id:this.state.currentUser,
        saved:this.state.saved,
      };
      AjaxFunctions.postExercise(exGraph, this.state.currentToken);
    } else {
      this.setState({
        lineData: [{ name: exName, values: walphin }],
        notification: 'enter reps and weight to update graph',
      });
      setTimeout(() => {
        this.setState({
          notification: '',
        });
      }, 3000);
    }
  }

  tempBackButton() {
    this.setState({
      type: 'default',
      LibraryShow: true,
      exerciseShow: false,
    });
  }

// added from Dan Pease Auth Temp
  trackSignupForm(e) {
    let fieldsArr = e.target.parentElement.childNodes;
    this.setState({
      signupForm: {
        username: fieldsArr[0].value,
        password: fieldsArr[1].value,
      },
    }, () => {
    });
  }

// added from Dan Pease Auth Temp
  trackLoginForm(e) {
    let fieldsArr = e.target.parentElement.childNodes;
    this.setState({
      loginForm: {
        username: fieldsArr[0].value,
        password: fieldsArr[1].value,
      },
    }, () => {
    });
  }

// added from Dan Pease Auth Temp
  postSignup() {
    fetch('/user/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.signupForm.username,
        password: this.state.signupForm.password,
      }),
    })
    .then((data) => {
      this.setState({
        signupForm: {
          username: '',
          password: '',
        },
        displaySignup: false,
        hideLogin:true,
        hideSignup:true,
      });
    });
  }

// added from Dan Pease Auth Temp
  postLogin() {
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.loginForm.username,
        password: this.state.loginForm.password,
      }),
    })
    .then(r => r.json())
    .then((data) => {
      this.setState({
        currentToken: data.token,
        currentUser: data.id,
        loginForm: {
          username: '',
          password: '',
        },
        hideComponent: true,
        hidelogs: false,
        notification: '',
      }, () => {
        this.whenLogged();
      });
    });

    if (this.state.currentToken === '') {
      this.setState({
        notification: 'userame and password invalid, please signup',
      });
    }
  }

// added from Dan Pease Auth Temp
  logout() {
    this.setState({
      currentToken: '',
      hideComponent: false,
      hidelogs: true,
      hideLogin:true,
      hideSignup:true,
      displayLogin:false,
      displaySignup: false,
    }, () => {
    });
  }

  handleAjaxGetAll() {
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    
    /* you need to pass down this.state.currentUser to specify which user's info you want to pull out from the database */    

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////

    return AjaxFunctions.getExercise(this.state.currentToken, this.state.currentUser)
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

  loginDisplay() {
    this.setState({
      hideSignup: false,
      hideLogin: false,
      displayLogin: true,
    });
  }

  SignupDisplay() {
    this.setState({
      hideSignup: false,
      hideLogin: false,
      displaySignup: true,
    });
  }

  switchToSignup() {
    this.setState({
      displayLogin: false,
      displaySignup: true,
      notification: '',
    });
  }

  switchToLogin() {
    this.setState({
      displayLogin: true,
      displaySignup: false,
    });
  }

  click() {
    console.log(this.state.currentUser);
    console.log(this.state.currentToken);
  }

  render() {
    return (
      <div>
        <div className="titleDisplay">
          <div className="logo flip"></div>
          <h1 className="title">New Yoaked</h1>
          <div className="logo"></div>
        </div>
        <h2 className="notificationPlace">{this.state.notification}</h2>
        <h3 className="date">{this.state.date}</h3>
        {this.state.hidelogs ? <div className="logs">
          <div className="logBorder">
            <Signup
              trackSignupForm={this.trackSignupForm.bind(this)}
              postSignup={this.postSignup.bind(this)}
              hideSignup={this.state.hideSignup}
              SignupDisplay={this.SignupDisplay.bind(this)}
              displaySignup={this.state.displaySignup}
              switchToLogin={this.switchToLogin.bind(this)}
            />
            <Login
              trackLoginForm={this.trackLoginForm.bind(this)}
              postLogin={this.postLogin.bind(this)}
              hideLogin={this.state.hideLogin}
              loginDisplay={this.loginDisplay.bind(this)}
              switchToSignup={this.switchToSignup.bind(this)}
              displayLogin={this.state.displayLogin}
              hideLogin={this.state.hideLogin}
            />
          </div>
        </div> : null}
        {this.state.hideComponent ? <div>
          <Logout
            logout={this.logout.bind(this)}
          />
          <List
            lists={this.state.lists}
            setType={(e) => this.setType(e)}
          />
          <Form
            updateWt={(e) => this.updateWt(e)}
            enterWt={this.enterWt.bind(this)}
            holderWt={this.state.holderWt}
            weight={this.state.weight}
            placeWt={this.state.placeWt}
          />
          <main>
            <div className="left">
              {this.state.exerciseShow ? <div>
                <button onClick={this.tempBackButton.bind(this)}>Show Library</button>
                <Exercise
                  saveExercise={(e) => this.saveExercise(e)}
                  exercises={this.state.exercises[this.state.type]}
                />
              </div> : null}
              {this.state.LibraryShow ? <div>
                <Library
                  saved={this.state.saved}
                  setgraph={this.setgraph.bind(this)}
                  deleteExercise={(e) => this.deleteExercise(e)}
                />
              </div> : null}
            </div>
            <div className="right">
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
            </div>
          </main>
        </div> : null}
      </div>
          // <button onClick={this.click.bind(this)}>TEMP CONSOLE CHECK</button>
    );
  }
}
