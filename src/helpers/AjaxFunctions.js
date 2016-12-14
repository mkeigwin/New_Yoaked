export default class AjaxFunctions {
  static getExercise(token) {
    console.log("********hello*************", token)
    return fetch('/exercise', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ` + token,
      },
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
