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
  app.get('/'                 , index     );
  app.get('/search'           , search    );
  app.get('/search/restaurants', search_restaurant);
  app.get('/restaurant'       , restaurant);
  app.get('/booking'        ,  booking);
  app.get('/booking/confirmation', confirmation);

  /* TODO: PROTECTED GET */
  app.get('/register', passport.antiMiddleware(), register);
  app.get('/signin', login   );

  /* TODO: PROTECTED POST */
  app.post('/reg_user', passport.antiMiddleware(), registerUser);

  app.post('/authenticate', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin?=fail'
  }));

  /* LOGOUT */
  app.get('/logout', passport.authMiddleware(), logout);

}

function index(req, res, next) {
  let time = utils.getTime();
  let date = utils.getDateInStr();
  let query = sql_query.allBranchWithStatus
  const title = 'Looking for places to eat?';

  // console.log(time, date)
  // console.log(query)

  pool.query(query, [time], (err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log("Am I authenticated", req.isAuthenticated(), req);
      if (req.isAuthenticated()) {
        res.render('index', {title: title, date: date, auth: true, data: data.rows})
      } else {
        res.render('index', {title: title, date: date, auth: false, data: data.rows})
      }
    }
  })
}

function search (req, res, next) {
  let ctx = 0, avg = 0, table
  let queryStr = req.query.restaurant;
  let rname = '%' + queryStr.toLowerCase() + '%'
  let searchQuery = sql_query.findRestaurant
  let time = utils.getTime();

  pool.query(searchQuery, [rname, time], (err, data) => {
    if (err || !data.rows || data.rows.length === 0) {
      ctx = 0
      table = []
    } else {
      ctx = data.rows.length
      table = data.rows
    }
    if (req.isAuthenticated()) {
      res.render('search', {page: 'Search Results', auth: true, query: queryStr, table: table, ctx: ctx})
    } else {
      res.render('search', {page: 'Search Results', auth: false, query: queryStr, table: table, ctx: ctx})
    }
  })
}

function pad(str) {
  return "'" + str + "'";
}

function search_restaurant(req, res, next) {
  let ctx = 0, avg = 0, table
  let searchQuery = sql_query.findWithUserPreference;
  let rname = req.query.rname;
  let location = req.query.location;
  let cuisineType = req.query.cuisineType;
  let reservationTime = req.query.reservationTime;
  let paxNo = req.query.paxNo;

  if(rname !== '')  {
    //rname = '%' + rname + '%'
    rname = pad(rname);
  }
  else {
    rname = '(SELECT DISTINCT rname FROM branches)';
  }

  searchQuery = searchQuery.replace('$1', rname);

  if(location !== '')   {
    location = pad(location);
  }
  else {
    location = 'SELECT DISTINCT location FROM branches';
  }


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


  pool.query(searchQuery, (err, data) => {
    if (err || !data.rows || data.rows.length === 0) {
      ctx = 0
      table = []
        console.log("PROBLEM", err);
    } else {
      ctx = data.rows.length
      table = data.rows
    }
    if(req.isAuthenticated()) {
      res.render('search_restaurants', {page: 'Search Results', table: table, ctx: ctx, auth: true});
    }
    else {
      res.render('search_restaurants', {page: 'Search Results', table: table, ctx: ctx, auth: false});
    }
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
  res.render('register', {title: 'Look4Makan', auth: false});
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
        username: username,
        passwordHash: password,
        firstname: firstName,
        lastname: lastName
      }, function(err) {
        if (err)  {
          //console.log(err)
          return res.redirect('/register?reg=fail')
        } else {
          return res.redirect('/')
        }
      })
    }
  })
}

 function booking(req, res, next) {
     // let rname = req.query.rname;
     // let reservationTime = req.query.reservationTime;
     // let paxNo = req.query.paxNo;
     let rname = 'Me';
     let reservationTime = '11:00:00';
     let paxNo = '3';
     if(req.isAuthenticated()) {
       res.render('booking', { page: "Bookings", rname : rname, reservationTime : reservationTime, paxNo : paxNo, auth: true});
     }
     else {
         res.render('booking', { page: "Bookings", rname : rname, reservationTime : reservationTime, paxNo : paxNo, auth : false});
     }
 }

 function confirmation(req, res, next) {
     // let rname = req.query.rname;
     // let reservationTime = req.query.reservationTime;
     // let paxNo = req.query.paxNo;
     let rname = 'Me';
     let reservationTime = '11:00:00';
     let paxNo = '3';
     if(req.isAuthenticated()) {
         res.render('confirmation', { page: "Confirmation", rname : rname, reservationTime : reservationTime, paxNo : paxNo, auth: true});
     }
     else {
         res.render('confirmation', { page: "Confirmation", rname : rname, reservationTime : reservationTime, paxNo : paxNo, auth : false});
     }
 }

function login(req, res, next) {
    res.render('signin', {title: 'Look4Makan', loginPage: true});
}

function logout(req, res, next) {
  req.session.destroy()
  req.logout()
  res.redirect('/')
}

module.exports = initRouter;