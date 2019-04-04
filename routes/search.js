const router = require('express').Router();

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    //ssl: true
});
const utils = require('./utils/util')
const queries = require('./sql/sqlQueries')

router.get('/', (req, res, next) => {
    let ctx = 0, avg = 0, table
    let queryStr = req.query.restaurant;
    let rname = '%' + queryStr.toLowerCase() + '%'
    let searchQuery = queries.findRestaurant
    let time = utils.getTime();

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

function pad(str) {
    return "'" + str + "'";

}

router.get('/restaurants', (req, res, next) => {
    let ctx = 0, avg = 0, table
    let searchQuery = queries.findWithUserPreference;
    let rname = req.query.rname;
    let location = req.query.location;
    let cuisineType = req.query.cuisineType;
    let reservationTime = req.query.reservationTime;
    let paxNo = req.query.paxNo;
    
    if(rname !== '')  {
        rname = pad(rname);
        console.log("GOT HERE");
    }
    else {
        rname = 'SELECT DISTINCT rname FROM branches';
    }

    searchQuery = searchQuery.replace('$1', rname);
    
    if(location !== '')   {
        location = pad(location);
    }
    else {
        location = 'SELECT DISTINCT location FROM branches';
    }
        console.log(location);


    searchQuery = searchQuery.replace('$2', location);
    
    if(cuisineType !== '')  {
        cuisineType = pad(cuisineType);
    }
    else {
       cuisineType = 'SELECT cuisineName FROM cuisineTypes';
    }
    searchQuery = searchQuery.replace('$3', cuisineType);

    if(reservationTime !== '') {
        reservationTime = pad(reservationTime);

        //show alert dont add!!!
    }
    else {
        reservationTime = "'11:00:00'";
    }
    searchQuery = searchQuery.replace('$4', reservationTime);
    searchQuery = searchQuery.replace('$4', reservationTime);
    searchQuery = searchQuery.replace('$4', reservationTime);


        //show alert dont add!!!
    
    if(paxNo === '')  {
        paxNo = 2; //by default   
    }
    
    searchQuery = searchQuery.replace('$5', paxNo);

    console.log(searchQuery);

    pool.query(searchQuery, (err, data) => {
        if (err || !data.rows || data.rows.length === 0) {
            ctx = 0
            table = []
            console.log("some problem...", err);
        } else {
            ctx = data.rows.length
            table = data.rows
        }
        res.render('search_restaurants', {page: 'Search Results', table: table, ctx: ctx})
    })
})


module.exports = router