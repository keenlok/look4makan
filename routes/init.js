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
  app.get('/contactUs'           , contact          );
  app.get('/search'             , search           );

  app.post('/search/restaurants' , insertIntoUserPreference, search_restaurant);

  app.get('/restaurant'          , restaurant       );
  // app.get('/restaurants'         , list_restaurants )
  app.post('/booking'            , booking          );
  app.get('/rateReservations'    , rateReservations );
  app.post('/Ratings'            , ratings          );


  // app.get('/booking/confirmation', insertIntoConfirmedBooking, insertIntoBooks, confirmation   );

  /*  Admin privileges  */
  app.get('/edit'       , adminDashboard   )
  app.get('/edit/insert', insertData       )
  app.get('/edit/update', updateData       )

  app.post('/insert/diners'     , insertIntoDiners             )
  app.post('/insert/restaurants', insertIntoRestaurantsBranches)


  /*  PROTECTED GET */
  app.get('/register', passport.antiMiddleware(), register);
  app.get('/signin', login   );
  app.post('/booking/confirmation', passport.authMiddleware(), insertIntoConfirmedBooking, insertIntoBooks, updateAward, confirmation);


  /*  PROTECTED POST */
  app.post('/reg_user', passport.antiMiddleware(), registerUser);

  app.post('/authenticate', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin?=fail'
  }));

  /* LOGOUT */
  app.get('/logout', passport.authMiddleware(), logout);

}

function ratings (req, res, next) {
  // res.render("ratings");
}

function rateReservations (req, res, next) {

  let selectQuery = sql_query.findAllUserBookings;
  let username = (req.user === undefined) ? '' : req.user.username;
  pool.query(selectQuery, [username], (err, data) => {
    if(!err) {
      let auth = req.isAuthenticated();
      res.render("rateReservations", {data: data.rows, auth : auth});
    }
  });
}

function contact (req, res, next) {

  res.render("contact", {auth : req.isAuthenticated()});
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
  let ctx = 0, avg = 0, table;
  let queryStr = req.query.restaurant;
  let rname = '%' + queryStr.toLowerCase() + '%';
  let searchQuery = sql_query.findRestaurant;
  let time = utils.getTime();

  pool.query(searchQuery, [rname, time], (err, data) => {
    if (err || !data.rows || data.rows.length === 0) {
      ctx = 0;
      table = [];
      console.log("Error in search", err)
    } else {
      ctx = data.rows.length;
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
  let rname = req.body.rname;
  let location = req.body.location;
  let cuisineType = req.body.cuisineType;
  let reservationTime = req.body.reservationTime;
  let paxNo = req.body.paxNo;
  let date = req.body.reservationDate;

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
  let rname = req.body.rname;
  let location = req.body.location;
  let cuisineType = req.body.cuisineType;
  let reservationTime = req.body.reservationTime;
  let paxNo = req.body.paxNo;
  let date = req.body.reservationDate;

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
          utils.setupUserAccount(pool, username);
          return res.redirect('/');
        }
      });
    }
  });
}

function booking(req, res, next) {
  let rname = req.body.rname;
  let bid = req.body.bid;
  let location = req.body.location;
  let reservationTime = req.body.reservationTime;
  let reservationDate = req.body.reservationDate;
  let paxNo = req.body.pax;
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
      let user = req.user;
      console.log("USER? " + user);
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
  let rname = req.body.rname;
  let bid = req.body.bid;
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
  let rname = req.body.rname;
  let bid = req.body.bid;
  let pax = req.body.pax;
  let reservationTime = req.body.reservationTime;
  let reservationDate = req.body.reservationDate;

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

  let rname = req.body.rname;
  let location = req.body.location;
  let reservationTime = utils.convert24to12Time(req.body.reservationTime);
  let reservationDate = utils.getDateInStr((req.query.reservationDate));
  let paxNo = req.body.pax;

  if(req.isAuthenticated()) {
    res.render('confirmation', { page: "Confirmation", rname : rname, location : location, reservationTime : reservationTime,  reservationDate : reservationDate, paxNo : paxNo, auth: true});
  }
  else {
    res.render('confirmation', { page: "Confirmation", rname : rname, location : location,  reservationTime : reservationTime, reservationDate : reservationDate, paxNo : paxNo, auth : false});
  }
}

/*  --- Admin functions ---  */
function adminDashboard (req, res, next) {
  let user = req.user
  if (typeof user === "undefined") {
    res.redirect('/') // Prevent unauthenticated access to this page
  }
  let date = utils.getDateInStr()

  res.render('edit', {
    page: "Admin Dashboard",
    dateInStr: date,
    auth: true,
    user: user
  })
}

function insertData (req, res, next) {
  let user = req.user
  if (typeof user === "undefined") {
    res.redirect('/') // Prevent unauthenticated access to this page
  }
  let date = utils.getDateInStr()
  pool.query(sql_query.getAllLocations, (err, data) => {
    if (err) {
      console.error("Error getting Locations", err)
    } else {
      console.log("Successfully queried location data", data)
      let location = data.rows
      pool.query(sql_query.getAllCuisines, (err, data) => {
        if (err) {
          console.error("Error getting Locations", err)
        } else {
          console.log("Successfully queried cuisine data", data)
          let cuisine = data.rows
          res.render('admin_insert', {
            page: "Admin Insert",
            dateInStr: date,
            auth: true,
            user: user,
            location: location,
            cuisine: cuisine
          })
        }
      })
    }
  })
}

// Basically register without the logging in to the user
function insertIntoDiners(req, res, next) {
  let username = req.body.username
  let password = bcrypt.hashSync(req.body.password, salt)
  let firstName = req.body.firstname
  let lastName = req.body.lastname

  pool.query(sql_query.add_user, [username, password, firstName, lastName], (err, data) => {
    if (err) {
      console.error("error in adding user", err);
      res.redirect('/edit/insert?user=fail')
    } else {
      console.log('Added users')
      res.redirect('/edit/insert?user=success')
    }
  })
}

function insertIntoRestaurantsBranches(req, res, next) {
  let rname = req.body.rname
  let opentime = req.body.opentime
  let closetime = req.body.closetime
  let location = req.body.location
  let cuisine = req.body.cuisine

  let default_start_bid = 1
  let operatingHours = utils.getTimeRangeAsStr(opentime, closetime)

  // console.log(req.body)
  // console.log(operatingHours)
  pool.query(sql_query.insert_rname, [rname], (err, data) => {
    if (err) {
      console.error("Error in adding rname", err)
      res.redirect('/edit/insert?rname=fail')
    } else {
      console.log("Successfully added restaurant!")
      let args = [
        rname,
        default_start_bid,
        location,
        operatingHours,
        utils.getCorrectTimeFormat(opentime),
        utils.getCorrectTimeFormat(closetime),
        cuisine
      ]
      pool.query(sql_query.insert_branch, args, (err, data) => {
        if (err) {
          console.error("Error in inserting branch", err)
          res.redirect('/edit/insert?branch=fail')
        } else {
          console.log("Successfully added branch!")
          res.redirect('/edit/insert?rest&branch=success')
        }
      })
    }
  })

}

function updateData (req, res, next) {
  let user = req.user
  if (typeof user === "undefined") {
    res.redirect('/') // Prevent unauthenticated access to this page
  }
  let date = utils.getDateInStr()

  res.render('admin_update', {
    page: "Admin Update",
    dateInStr: date,
    auth: true,
    user: user
  })
}

/* --- Admin functions ends here --- */

function updateAward(req, res, next) {
  if(req.user === undefined) {
    return next();
  }
  const awardPoint = 100;
  let updateQuery = sql_query.updateAward;
  pool.query(updateQuery, [awardPoint, req.user.username], (err, data) => {
    if(!err) {
      console.log("successful Updating of Rewards!");
    }
    else {
      console.error("Failure to update rewards.. ", err);
    }
  });
  next();

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
