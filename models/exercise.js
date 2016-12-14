const db = require('./dbConnect');

module.exports = {
  getExercise(req, res, next) {
    db.any(`
      SELECT * FROM exercise;
      `)
      .then((exercise) => {
        res.rows = exercise;
        next();
      })
      .catch(error => next(error));
  },

  postExercise(req,res,next) {
    console.log("******************", req.body)
    if (req.body.saved.length > 0) {
// Ignore the var MATT!!!! this needs to be hoisted
      var insertStr = `exercise(start,wow,saved)`;
      var valueStr = `($1, $2, $3)`;
    } else {
// Ignore the var MATT!!!! this needs to be hoisted
      var insertStr = `exercise(start,wow)`;
      var valueStr = `($1, $2)`;
    }
    db.one(`
      INSERT INTO
        ${insertStr}
      VALUES
        ${valueStr}
      RETURNING *;
    `, [req.body.start, req.body.wow, JSON.stringify(req.body.saved)])
    .then((exercise) => {
      res.rows = exercise;
      next();
    })
    .catch(error => next(error));
  },
};
