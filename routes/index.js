const express = require('express');
const router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

console.log(process.env.DATABASE_URL);

const utils = require('./utils/util');

let time = utils.getTime();
let date = utils.getDateInStr();

const query = require('./sql/sqlQueries').allBranchWithStatus;

const title = 'Looking for places to eat?';

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(query, [time], (err, data) => {
      res.render('index', {title: title, date:date, data: data.rows});
  })

});

module.exports = router;
