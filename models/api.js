// added from Dan Pease Auth Temp
const db = require('./dbConnect');

function getAllSecrets(req, res, next) {
  db.many('SELECT * FROM secretstuff')
    .then((secrets) => {
      res.secrets = secrets
      next();
    })
  .catch(error => console.log(error))
}

module.exports = {
  getAllSecrets
}
