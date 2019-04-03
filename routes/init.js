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

console.log("database: " + process.env.DATABASE_URL);


function initRouter(app) {
  app.get('/'                 , index     )
  app.get('/search'           , search    )
  app.get('/search/postalCode', postalCode)
  
  /* TODO: PROTECTED GET */
  app.get('/signup', register)
  app.get('/signin',   login   )
  
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
}

function postalCode(req, res, next)  {
  let ctx = 0, avg = 0, table
  let searchQuery = sql_query.findWithPostCode;
  let queryStr = req.query.postalcode;
  let time = utils.getTime();

  pool.query(searchQuery, [time, queryStr], (err, data) => {
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

function register(req, res, next) {
  res.render('register', {title: 'Look4Makan'});
}

function login(req, res, next) {
  res.render('signin', {title: 'Look4Makan'});
}

module.exports = initRouter;



