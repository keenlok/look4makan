const express = require('express');
const router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

let today = new Date();
const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

const query = require('./sql/sqlQueries').findAllAvailableRestaurants;

/* GET home page. */
router.get('/', function(req, res, next) {
  pool.query(query, [time], (err, data) => {
      res.render('index', {title: 'Look4Makan', data: data.rows});
  })
});

module.exports = router;
