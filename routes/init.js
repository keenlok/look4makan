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
  app.get('/'                    , index            );
  app.get('/search'              , search           );
  app.get('/search/restaurants'  , insertIntoUserPreference, search_restaurant);
  app.get('/restaurant'          , restaurant       );
  // app.get('/restaurants'         , list_restaurants )
  app.get('/booking'             , booking          );
  // app.get('/booking/confirmation', insertIntoConfirmedBooking, insertIntoBooks, confirmation   );

    /*  PROTECTED GET */
  app.get('/register', passport.antiMiddleware(), register);
  app.get('/signin', login   );
  app.get('/booking/confirmation', passport.authMiddleware(), insertIntoConfirmedBooking, insertIntoBooks, confirmation);


    /*  PROTECTED POST */
  app.post('/reg_user', passport.antiMiddleware(), registerUser, index);

  app.post('/authenticate', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin?=fail'
  }));

  /* LOGOUT */
  app.get('/logout', passport.authMiddleware(), logout);

}

function index(req, res, next) {

  //use req.user to get user info
  let user = req.user;
  let time = utils.getTime();
  let dateInStr = utils.getDateInStr();
  const title = 'Looking for places to eat?';
   // console.log(time, date)

    //console.log(utils.getDate());
  // console.log(query)
    let date = utils.getDate();
    let query = sql_query.getAllLocations;
    let query1= sql_query.getAllCuisines;
    let query2= sql_query.getAllRestaurantName;
    let query3= sql_query.getAllTimeSlots;

    pool.query(query, (err, data) => {
    if (err) {
      console.error(err)
      error(err, res);
    } else {
        pool.query(query1, (err1, data1) => {
            pool.query(query2, (err2, data2) => {
                pool.query(query3, (err3, data3) => {
                  let auth = !!req.isAuthenticated()
                  res.render('index', {
                    title: title,
                    dateInStr : dateInStr,
                    date : date,
                    time : time,
                    auth: auth,
                    data: data.rows,
                    data1: data1.rows,
                    data2: data2.rows,
                    data3: data3.rows,
                    user: user
                  })
                });
            });
        });
    }});
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
      console.log("Error in search", err)
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

const pad = utils.pad;


function insertIntoUserPreference (req, res, next) {
  let insertQuery = sql_query.insertUserPreference;
  let rname = req.query.rname;
  let location = req.query.location;
  let cuisineType = req.query.cuisineType;
  let reservationTime = req.query.reservationTime;
  let paxNo = req.query.paxNo;
  let date = req.query.reservationDate;

  if(req.user  === undefined) {
    return next();
  }

  let username = req.user.username;

  if(rname === '')  {
    rname = null;
  }
  if(location === '')   {
    location = null;
  }

  if(cuisineType === '')  {
    cuisineType = null;
  }

  if(paxNo === '')  {
    paxNo = 2; //by default
  }

  let arguments = [
    username,         //$1
    rname,            //$2
    location,         //$3
    date,             //$4
    reservationTime,  //$5
    cuisineType,      //$6
    paxNo             //$7
  ];


   console.log("INSERT QUERY :", insertQuery, arguments);
  pool.query(insertQuery, arguments, (err, data) => {
    if(!err) {
      console.log("successful insertion into UserPreferences Table");
    }
    else
      console.error("failed insertion into UserPreferences Table", err);
  })
  next();
}

function search_restaurant(req, res, next) {
  let ctx = 0, avg = 0, table
  let searchQuery = sql_query.findWithUserPreference;
  let rname = req.query.rname;
  let location = req.query.location;
  let cuisineType = req.query.cuisineType;
  let reservationTime = req.query.reservationTime;
  let paxNo = req.query.paxNo;
  let date = req.query.reservationDate;

    if(rname !== '')  {
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
  }

  searchQuery = searchQuery.replace('$4', reservationTime);
  searchQuery = searchQuery.replace('$4', reservationTime);
  searchQuery = searchQuery.replace('$4', reservationTime);

  if(paxNo === '')  {
    paxNo = 2; //by default
  }

  searchQuery = searchQuery.replace('$5', paxNo);

    if(date !== '') {
        date = pad(date);
    }

    searchQuery = searchQuery.replace('$6', date);

    pool.query(searchQuery, (err, data) => {
    if (err || !data.rows || data.rows.length === 0) {
      ctx = 0
      table = []
    } else {
      ctx = data.rows.length
      table = data.rows
    }

    let auth = !!req.isAuthenticated();

    res.render('search_restaurants', {
      page: 'Search Results',
      table: table,
      ctx: ctx,
      reservationTime: reservationTime,
      reservationDate : date,
      pax: paxNo,
      auth: auth,
      user: req.user
    });
  })
}

function restaurant(req, res, next) {
  let rname = req.query.rname
  const time = utils.getTime()
  // console.log(time, req.query)
  let query = sql_query.getRestaurant
  pool.query(query, [rname, time], (err, data) => {
    let table, count, auth
    let date = utils.getDateInStr()

    if (err) {
      error(err, res)
    } else if (!data.rows || data.rows.length === 0) {
      table = []
      count = 0
    } else {
      table = data.rows
      count = data.rows.length
      rname = table[0].rname
    }

    // Get menu items for this restaurant
    let subquery = sql_query.getMenuItems
    pool.query(subquery, [rname], (err, data) => {
      let menu, menuCount

      if (err) {
        console.error("CANNOT GET MENU items")
      } else if (!data.rows || data.rows.length === 0) {
        menuCount = 0
        menu = []
      } else {
        menu = data.rows
        let getMenuCount = (menu) => {
          let count = 0
          for (let i = 0; i < menu.length; i++) {
            if (i === 0 ) {
              count++;
            } else if (menu[i].menuname !== menu[i-1].menuname) {
              count++
            }
          }
          return count
        }
        menuCount = getMenuCount(menu)
        menu = utils.separateData(menu, menuCount)
        console.log("The menu count is: ",menuCount);
      }

      auth = !!req.isAuthenticated();
      res.render('restaurant', {
        page: 'Look4Makan',
        data: table,
        auth: auth,
        count: count,
        rname: rname,
        date: date,
        menu: menu,
        menuCount: menuCount,
        user: req.user
      })
    })

  })
}

function register(req, res, next) {
  res.render('register', {title: 'Look4Makan', auth: false});
}

function registerUser(req, res, next) {
  let username = req.body.username;
  let password = bcrypt.hashSync(req.body.password, salt);
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;

  pool.query(sql_query.add_user, [username, password, firstName, lastName], (err, data) => {
    if (err) {
      console.error("error in adding user", err);
      res.redirect('/register?reg=fail')
    } else {
      req.login({
        username: username,
        passwordHash: password,
        firstname: firstName,
        lastname: lastName
      }, function(err) {
        if (err)  {
          // console.error(err);
          return res.redirect('/register?reg=fail');
        } else {
            return res.redirect('/', {});
        }
      })
    }
  })
}

function booking(req, res, next) {
  let rname = req.query.rname;
  let bid = req.query.bid;
  let location = req.query.location;
  let reservationTime = req.query.reservationTime;
  let reservationDate = req.query.reservationDate;
  let paxNo = req.query.pax;
  let query = sql_query.findMinMaxHourOfABranch;
  // let cuisine_type = req.query.cuisinetype

  pool.query(query, [rname, bid], (err, data) => {

    // Get menu items for this restaurant
    let subquery = sql_query.getMenuItems


    pool.query(subquery, [rname], (err1, data1) => {
      let menu, menuCount

      if (err1) {
        console.error("CANNOT GET MENU items")
      }
      else if (!data1.rows || data1.rows.length === 0) {
        menuCount = 0
        menu = []
      } else {
        menu = data1.rows
        let getMenuCount = (menu) => {
          let count = 0
          for (let i = 0; i < menu.length; i++) {
            if (i === 0) {
              count++;
            } else if (menu[i].menuname !== menu[i - 1].menuname) {
              count++
            }
          }
          return count
        };
        menuCount = getMenuCount(menu)
        menu = utils.separateData(menu, menuCount)
        // console.log("The menu count is: ", menuCount);
      }
      let auth = !!req.isAuthenticated();
      let user = req.user
      res.render('booking', {
        page: "Bookings",
        rname: rname,
        bid : bid,
        reservationTime: reservationTime,
        reservationDate : reservationDate,
        paxNo: paxNo,
        location: location,
        data: data.rows,
        menu : menu,
        menuCount : menuCount,
        auth: auth,
        user: user
      });
        });
    });
}

function insertIntoConfirmedBooking (req, res, next) {
  let rname = req.query.rname;
  let bid = req.query.bid;
  let insertQuery = sql_query.insertConfirmedBooking;
  if(req.user === undefined) {
    return next();
  }

  let queryArgs = [
    req.user.username,
    rname,
    bid
  ];

  console.log(insertQuery);
  pool.query(insertQuery, queryArgs, (err, data) => {
    if(!err) {
      console.log("Successful insertion into ConfirmedBookings Table ")
    }
    else {
      console.log("Failed insertion into ConfirmedBookings Table ")
      console.error(err.detail)
    }
  });
  return next();
}

function insertIntoBooks (req, res, next) {
    let rname = req.query.rname;
    let bid = req.query.bid;
    let pax = req.query.pax;
    let reservationTime = req.query.reservationTime;
    let reservationDate = req.query.reservationDate;

    let insertQuery = sql_query.insertBooks;

    if(req.user === undefined) {
        return next();
    }

    let selectQuery = sql_query.find_tid;

    // selectQuery = selectQuery.replace("$1", pad(rname));
    // selectQuery = selectQuery.replace("$2", bid);
    // selectQuery = selectQuery.replace("$3", pax);

    console.log("SELECTQUERY: " + selectQuery);

    pool.query(selectQuery, [rname, bid, pax], (err, data) => {
        if(!err) {
            // insertQuery = insertQuery.replace("$1", pad(req.user.username));
            // insertQuery = insertQuery.replace("$2", pad(rname));
            // insertQuery = insertQuery.replace("$3", bid);
            // insertQuery = insertQuery.replace("$4", data.rows[0].tid);
            // insertQuery = insertQuery.replace("$5", pax);
            // insertQuery = insertQuery.replace("$6", pad(reservationTime));
            // insertQuery = insertQuery.replace("$7", pad(reservationDate));


            let arguments = [
                req.user.username,
                rname,
                bid,
                data.rows[0].tid,
                pax,
                reservationTime,
                reservationDate
            ];

            pool.query(insertQuery, arguments, (err, data) => {
                if(!err) {
                    console.log("Successful insertion into Booking Table ")
                }
                else {
                    console.log("Failed insertion into Books Table ", err.detail)
                }
            });
        }
    });
    return next();
}

 function confirmation(req, res, next) {

   let rname = req.query.rname;
   let location = req.query.location;
   let reservationTime = req.query.reservationTime;
   let reservationDate = utils.getDateInStr((req.query.reservationDate));
   let paxNo = req.query.pax;

   if(req.isAuthenticated()) {
       res.render('confirmation', { page: "Confirmation", rname : rname, location : location, reservationTime : reservationTime,  reservationDate : reservationDate, paxNo : paxNo, auth: true});
   }
   else {
       res.render('confirmation', { page: "Confirmation", rname : rname, location : location,  reservationTime : reservationTime, reservationDate : reservationDate, paxNo : paxNo, auth : false});
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

function error(err, res) {
  res.render('error', {message: 'ERROR OCCURED', error: err})
}

module.exports = initRouter;
