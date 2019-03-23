const express = require('express');
const router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const query = require('./sql/sqlQueries').findRestaurant;

const utils = require('./utils/util');
const rname = 'GoodFood';
const time = utils.getTime();
console.log(time);

router.get('/', function(req, res, next) {
    pool.query(query, [time, rname], (err, data) => {
        res.render('restaurant', {title: 'Look4Makan', data: data.rows});
    })
});

module.exports = router;