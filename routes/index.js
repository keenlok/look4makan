const express = require('express');
const router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

let today = new Date();
console.log(today);
const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
console.log(time);
const test = require('./sql/sqlQueries').findAllAvailableRestaurants;
/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(test, [time], (err, data) => {
      res.render('index', {title: 'Look4Makan', data: data.rows});
  })
});

module.exports = router;
