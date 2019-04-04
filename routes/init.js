const sql_query = require('./sql/sqlQueries')
const passport = require('passport')
const bcrypt = require('bcrypt')
const utils = require('./utils/util')

// Postgre SQL Connection
const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl: true
})

const round = 10;
const salt  = bcrypt.genSaltSync(round);

function initRouter(app) {
  app.get('/'                 , index     )
  app.get('/search'           , search    )
  app.get('/search/postalCode', postalCode)
  app.get('/restaurant'       , restaurant)

  /* TODO: PROTECTED GET */
  app.get('/signup', register)
  app.get('/signin',   login   )

  /* TODO: PROTECTED POST */
  app.post('/reg_user', registerUser)
  
}

function index(req, res, next) {
  let time = utils.getTime()
  let date = utils.getDateInStr()
  let query = sql_query.allBranchWithStatus
  const title = 'Looking for places to eat?'

  console.log(time, date)
  console.log(query)

  pool.query(query, [time], (err, data) => {
    if (err){
      console.log(err)
    } else {
      res.render('index', {title: title, date: date, data: data.rows})
    }
  })
}

function search(req, res, next) {
  let ctx = 0, avg = 0, table
  let queryStr = req.query.restaurant;
  let rname = '%' + queryStr.toLowerCase() + '%'
  let searchQuery = sql_query.findRestaurant
  let time = utils.getTime();
  console.log("rname here", rname)

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
}

function postalCode(req, res, next)  {
  let ctx = 0, avg = 0, table
  let searchQuery = sql_query.findWithPostCode;
  // let searchQuery = 'SELECT distinct rname, openingHours, location FROM branches B natural JOIN freeTables F WHERE B.rname in \'(SELECT DISTINCT rname FROM restaurants)\' and B.location in (SELECT DISTINCT location FROM branches) and cuisineType in (SELECT DISTINCT cuisineName FROM CuisineTypes) and B.openTime <= \'11:00:00\' and B.closeTime >= \'11:00:00\' and F.pax >= \'2\' and F.availableSince <= \'11:00:00\';';
  let queryStr = req.query.postalcode;
  console.log(1000 - queryStr);
  let time = utils.getTime();

  pool.query(searchQuery, [time, queryStr], (err, data) => {
    if (err || !data.rows || data.rows.length === 0) {
      ctx = 0
      table = []
      console.log(err);
    } else {
      ctx = data.rows.length
      table = data.rows
    }
    res.render('search', {page: 'Search Results', query: queryStr, table: table, ctx: ctx})
  })
}

function restaurant(req, res, next) {
  const rname = 'macdonalds';
  const time = utils.getTime();
  console.log(time);
  let query = sql_query.findRestaurant

  pool.query(query, [time, rname], (err, data) => {
    res.render('restaurant', {page: 'Look4Makan', data: data.rows});
  })
}

function register(req, res, next) {
  res.render('register', {title: 'Look4Makan'});
}

function registerUser(req, res, next) {
  let username = req.body.username
  let password = bcrypt.hashSync(req.body.password, salt)
  let firstName = req.body.firstname
  let lastName = req.body.lastname

  pool.query(sql_query.add_user, [username, password, firstName, lastName], (err, data) => {
    if (err) {
      console.error("error in adding user", err)
      res.redirect('/register?reg=fail')
    } else {
      req.login({

      })
    }
  })

  console.log(req.body);
}

function login(req, res, next) {
  res.render('signin', {title: 'Look4Makan'});
}

module.exports = initRouter;



