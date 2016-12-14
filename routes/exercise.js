const exercise = require('express').Router();
const db = require('../models/exercise');

const sendJSONResp = (req, res) => res.json(res.rows);
const sendStatus = (req, res) => res.status(200).end();

exercise.use((req, res, next) => {  console.log(req.body); next(); })

exercise.route('/')
  .get(db.getExercise, sendJSONResp)
  .post(db.postExercise, sendJSONResp);

module.exports = exercise;
