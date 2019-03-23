const express = require('express');
const router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const sql_query = 'SELECT * FROM student_info';
const test = require('./sql/sqlQueries').findAllAvailableRestaurants;
const time = '12:10:00';
/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(test, [time], (err, data) => {
      res.render('index', {title: 'Look4Makan', data: data.rows});
  })
});

module.exports = router;
