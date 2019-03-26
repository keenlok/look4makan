const router = require('express').Router();

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    //ssl: true
});
const utils = require('./utils/util')
const searchQuery = require('./sql/sqlQueries').findRestaurant

router.get('/', (req, res, next) => {
    let ctx = 0, avg = 0, table
    let queryStr = req.query.restaurant;
    let rname = '%' + queryStr.toLowerCase() + '%'
    let time = utils.getTime();
    //console.log(rname)

    pool.query(searchQuery, [time, rname], (err, data) => {
        if (err || !data.rows || data.rows.length === 0) {
            ctx = 0
            table = []
        } else {
            ctx = data.rows.length
            table = data.rows
        }
        res.render('search', {page: 'Search Results', query: queryStr, table: table, ctx: ctx})
    })
})

module.exports = router