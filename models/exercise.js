const { sqlDB } = require('./dbConnect');

module.exports = {
  getExercise(req, res, next) {
    sqlDB.any(`
      SELECT * FROM exercise;
      `)
      .then((exercise) => {
        res.rows = exercise;
        console.log('num items: ', exercise.length);
        next();
      })
      .catch(error => next(error));
  },

  postExercise(req,res,next) {
    if (req.body.saved.length > 0) {
// Ignore the var MATT!!!! this needs to be hoisted
      var insertStr = `exercise(start,wow,username,saved)`;
      var valueStr = `($1, $2, $3, $4)`;
    } else {
// Ignore the var MATT!!!! this needs to be hoisted
      var insertStr = `exercise(start,wow,username)`;
      var valueStr = `($1, $2, $3)`;
    }
    sqlDB.one(`
      INSERT INTO
        ${insertStr}
      VALUES
        ${valueStr}
      RETURNING *;
    `, [req.body.start, req.body.wow, req.body.username, JSON.stringify(req.body.saved)])
    .then((exercise) => {
      res.rows = exercise;
      next();
    })
    .catch(error => next(error));
  },
};
