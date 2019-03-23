const express = require('express');
const router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

let today = new Date();
const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

const query = require('./sql/sqlQueries').findAllAvailableRestaurants;

const title = 'Looking for places to eat?';

const dayStr = require('./utils/util').convertDayToStr(today.getDay());
const monthStr = require('./utils/util').convertMonthToStr(today.getMonth());

const date = dayStr + ' ' + today.getDate() + ' ' + monthStr + ' ' + today.getFullYear();

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(query, [time], (err, data) => {
      res.render('index', {title: title, date:date, data: data.rows});
  })
});

module.exports = router;
