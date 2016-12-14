export default class AjaxFunctions {
  static getExercise() {
    return fetch('/exercise', {
      method: 'GET',
    })
    .then(r => r.json());
  }
// ajax gets all drawing into db
  static postExercise(exercise) {
    return fetch('/exercise', {
      headers: {
        'Content-Type':'application/json',
      },
      method:'POST',
      body: JSON.stringify(exercise),
    })
    .then(r => r.json());
  }

  static signUp(user, pass) {
    console.log(user, pass);
    return fetch('/users', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    });
  }
// ajax that puts user info into user table based on username and password
  static logIn(user, pass) {
    return fetch('/auth', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    })
      .then(r => r.json());
  }
// ajax that logs user into account using info based on username and password in user table
}
