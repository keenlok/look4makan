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
  app.get('/search/restaurants'  , search_restaurant);
  app.get('/restaurant'          , restaurant       );
  app.get('/booking'             , booking          );
  app.get('/booking/confirmation', confirmation     );

    /*  PROTECTED GET */
  app.get('/register', passport.antiMiddleware(), register)
  app.get('/signin', login   )

  /*  PROTECTED POST */
  app.post('/reg_user', passport.antiMiddleware(), registerUser)

  app.post('/authenticate', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin?=fail'
  }));

  /* LOGOUT */
  app.get('/logout', passport.authMiddleware(), logout);

}

function index(req, res, next) {
  let time = utils.getTime();
  let dateInStr = utils.getDateInStr();
  const title = 'Looking for places to eat?';
   // console.log(time, date)
    console.log("DAMN IT")
    console.log(utils.getDate());
  // console.log(query)
    let date = utils.getDate();
    let query = sql_query.getAllLocations;
    let query1= sql_query.getAllCuisines;
    let query2= sql_query.getAllRestaurantName;

    pool.query(query, (err, data) => {
    if (err) {
      console.error(err)
      error(err, res);
    } else {
        pool.query(query1, (err1, data1) => {
            pool.query(query2, (err2, data2) => {
                if (req.isAuthenticated()) {
                    res.render('index', {title: title, dateInStr : dateInStr, date : date, auth: true, data: data.rows, data1: data1.rows, data2: data2.rows})
                } else {
                    console.log(data1);
                    res.render('index', {title: title, dateInStr : dateInStr, date : date, auth: false, data: data.rows, data1: data1.rows, data2: data2.rows})
                }
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

function search_restaurant(req, res, next) {
  let ctx = 0, avg = 0, table
  let searchQuery = sql_query.findWithUserPreference;
  let rname = req.query.rname;
  let location = req.query.location;
  let cuisineType = req.query.cuisineType;
  let reservationTime = req.query.reservationTime;
  let paxNo = req.query.paxNo;
  // console.log("rname: " + rname);
  // console.log("location: " + location);
  // console.log("cuisineType: " + cuisineType);
  // console.log("reservationTime: " + reservationTime);
  // console.log("paxNo: " + paxNo);

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
    // console.log("rname: " + rname);
    // console.log("location: " + location);
    // console.log("cuisineType: " + cuisineType);
    // console.log("reservationTime: " + reservationTime);
    // console.log("paxNo: " + paxNo);

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

    let auth = !!req.isAuthenticated();

    res.render('search_restaurants', {
      page: 'Search Results',
      table: table,
      ctx: ctx,
      reservationTime: reservationTime,
      pax: paxNo,
      auth: auth
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
        menuCount: menuCount
      })
    })

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
          console.error(err)
          return res.redirect('/register?reg=fail')
        } else {
          return res.redirect('/')
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
  let paxNo = req.query.pax;
  let query = sql_query.findMinMaxHourOfABranch;
  // let cuisine_type = req.query.cuisinetype

    query = query.replace("$0", pad(rname));
    pool.query(query, [bid], (err, data) => {

        // Get menu items for this restaurant
        let subquery = sql_query.getMenuItems
        subquery = subquery.replace("$1", pad(rname));
        pool.query(subquery, (err1, data1) => {
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
                }
                menuCount = getMenuCount(menu)
                menu = utils.separateData(menu, menuCount)
                console.log("The menu count is: ", menuCount);
            }

            if (req.isAuthenticated()) {
                res.render('booking', {
                    page: "Bookings",
                    rname: rname,
                    reservationTime: reservationTime,
                    paxNo: paxNo,
                    location: location,
                    data: data.rows,
                    menu : menu,
                    menuCount : menuCount,
                    auth: true
                });
            }
            else {
                res.render('booking', {
                    page: "Bookings",
                    rname: rname,
                    reservationTime: reservationTime,
                    paxNo: paxNo,
                    location: location,
                    data: data.rows,
                    menu : menu,
                    menuCount : menuCount,
                    auth: false
                });
            }
        });
    });
}

 function confirmation(req, res, next) {
  console.log(req.query)
   let rname = req.query.rname;
   let location = req.query.location;
   let reservationTime = req.query.reservationTime;
   let paxNo = req.query.pax;

   let sql_query = 'INSERT INTO test VALUES (' + rname + ", " + reservationTime + ", " + paxNo + ");";

     // pool.query(sql_query, (err, data) => {
     // if(!err) {
         if(req.isAuthenticated()) {
             res.render('confirmation', { page: "Confirmation", rname : rname, location : location, reservationTime : reservationTime, paxNo : paxNo, auth: true});
         }
         else {
             res.render('confirmation', { page: "Confirmation", rname : rname, location : location,  reservationTime : reservationTime, paxNo : paxNo, auth : false});
         }
   //   }
   // });
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

