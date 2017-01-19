export default class AjaxFunctions {
  static getExercise(token, user) {
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

          /* added body.user to the fetch parameter */

    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    return fetch('/exercise', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ` + token,
      },
      body: {
        user: user,
      }
    })
    .then(r => r.json());
  }
// ajax gets all drawing into db
  static postExercise(exercise, token) {
    return fetch('/exercise', {
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ` + token,
      },
      method:'POST',
      body: JSON.stringify(exercise),
    })
    .then(r => r.json());
  }

}
