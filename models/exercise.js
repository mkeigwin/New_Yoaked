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
    // console.log("******************", req.body);
    console.log(req.body.saved.length);
    if (req.body.saved.length > 0) {
// Ignore the var MATT!!!! this needs to be hoisted
      var insertStr = `exercise(start,wow,user_id,saved)`;
      var valueStr = `($1, $2, $3, $4)`;
    } else {
      console.log(req.body)
// Ignore the var MATT!!!! this needs to be hoisted
      var insertStr = `exercise(start,wow,user_id)`;
      var valueStr = `($1, $2, $3)`;
    }
    db.one(`
      INSERT INTO
        ${insertStr}
      VALUES
        ${valueStr}
      RETURNING *;
    `, [req.body.start, req.body.wow, req.body.user_id, JSON.stringify(req.body.saved)])
    .then((exercise) => {
      res.rows = exercise;
      next();
    })
    .catch(error => next(error));
  },
};
