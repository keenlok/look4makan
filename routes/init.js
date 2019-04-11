const sql_query = require('./sql/sqlQueries');
const passport = require('passport');
const bcrypt = require('bcrypt');
const utils = require('./utils/util');
const admin = require('./admin');


// Postgre SQL Connection
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl: true
});

const round = 10;
const salt  = bcrypt.genSaltSync(round);

function initRouter(app) {

  //Main Feature
  app.get('/'                    , index);
  app.post('/search/restaurants' , insertIntoUserPreference, search_restaurant);
  app.post('/booking'            , booking);
  app.post('/booking/confirmation', passport.authMiddleware(), insertIntoConfirmedBooking, insertIntoBookedTables, insertIntoBooks, updateAward, confirmation);

  //Rate your Bookings Feature
  app.get('/rateReservations'    , rateReservations);
  app.post('/rateReservations/ratings', ratings);
  app.post("/ratings/complete", insertIntoRatings);

  //Change or Cancel Reservation Feature
  app.get('/editReservations', editReservations);
  app.post('/editReservations/edit', editReservationMode);
  app.post('/edits/complete', updateDeleteReservation);


  /*  Admin privileges  */
  app.get('/edit'       , admin.adminDashboard);
  app.get('/edit/insert', admin.insertData);
  app.get('/edit/update', admin.updateData);

  app.post('/insert/diners'     , admin.insertIntoDiners             );
  app.post('/insert/restaurants', admin.insertIntoRestaurantsBranches);
  app.post('/insert/locations'  , admin.insertLocations              );
  app.post('/insert/menu'       , admin.insertMenu                   );
  app.post('/insert/intomenu'   , admin.insertIntoMenu               );
  app.post('/insert/cuisine'    , admin.insertCuisine                );

  app.post('/update/menu', admin.updateMenu)
  app.post('/delete/menu', admin.deleteMenu)


  app.get('/search'             , admin.search);
  app.get('/restaurant'          , restaurant);  //can move to admin?


  /*  PROTECTED GET */
  app.get('/register', passport.antiMiddleware(), register);
  app.get('/signin', login   );

  /*  PROTECTED POST */
  app.post('/reg_user', passport.antiMiddleware(), registerUser);

  app.post('/authenticate', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin?=fail'
  }));

  /* LOGOUT */
  app.get('/logout', passport.authMiddleware(), logout);


  app.get('/contactUs'           , contact);
}


function rateReservations (req, res, next) {

    let selectQuery = sql_query.findAllUserBookings;
    let username = (req.user === undefined) ? '' : req.user.username;
    pool.query(selectQuery, [username], (err, data) => {
        if(!err) {
            let auth = req.isAuthenticated();
            res.render("rateReservations", {data: data.rows, auth : auth, user: req.user});
        }
    });
}

function ratings (req, res, next) {
    let rname = req.body.rname;
    let bid = req.body.bid;

    if(req.user !== undefined) {
        let selectQuery = sql_query.findRatingsGivenUsernameRname;
        console.log("query : " + selectQuery);
        console.log("rname : " + rname);
        console.log("bid : " + bid);
        console.log("username : " + req.user.username);
        pool.query(selectQuery, [rname,req.user.username, bid], (err, data) => {
            if(err) {
                console.log("FUCK");
            }
            let auth = req.isAuthenticated();
            res.render("ratings", {rname : rname, username : req.user.username, bid : bid, data : data.rows, auth: auth});
        });
    }
}

function insertIntoRatings (req, res, next) {
    if(req.body.rname === undefined) {
        return next();
    }

    let rname = req.body.rname;
    let bid = req.body.bid;
    let rating = req.body.newRating;

    let insertQuery = sql_query.insertIntoRatings;

    pool.query(insertQuery, [rating, req.user.username, rname, bid], (err, data) => {
        if(!err) {
            console.log("successful insertion into Ratings Table!");
        }
        else {
            console.error("failed insertion into Ratings Table", err);
        }
    });
    res.redirect("/");
}



function editReservations (req, res, next) {

    let selectQuery = sql_query.findAllUserBooks;
    let username = (req.user === undefined) ? '' : req.user.username;
    pool.query(selectQuery, [username], (err, data) => {
        if(!err) {
            if(data.rows !== undefined) {
              for (let i = 0; i < data.rows.length; i++) {
                let date = new Date(data.rows[i].reservationdate);
                data.rows[i].reservationdate = utils.getDate(date);
              }
            }
            let auth = req.isAuthenticated();
            res.render("editReservations", {data: data.rows, auth : auth, user: req.user});
        }
    });
}

function editReservationMode (req, res, next) {
    let rname = req.body.rname;
    let bid = req.body.bid;
    let tid = req.body.tid;
    let pax = req.body.pax;
    let reservationTime = req.body.reservationTime;
    let reservationDate = req.body.reservationDate;

    console.log("RECEIVED " + rname + " " + bid + " " + tid + " " + pax + " " + reservationTime + " " + reservationDate); //leave for testing correctness

    let auth = req.isAuthenticated();

    res.render("editReservationMode", {rname : rname, rname: rname, bid : bid, tid : tid, pax : pax, reservationTime : reservationTime, reservationDate : reservationDate, auth: auth});
}

function updateDeleteReservation (req, res, next) {
    let rname = req.body.rname;
    let bid = req.body.bid;
    let tid = req.body.tid;
    let pax = req.body.pax;
    let reservationTime = req.body.reservationTime;
    let reservationDate = req.body.reservationDate;
    let isUpdate = req.body.isUpdate;

    console.log(req.user.username + " " + rname + " " + bid + " " + tid + " " + reservationTime + " " + reservationDate + " " + isUpdate);
    let arguments = [rname, bid, tid, reservationTime, reservationDate];
    let delete_query1 = sql_query.deleteBookedTable;
    pool.query(delete_query1, arguments, (err, data) => {
        if (err) {
            console.error("Fail to delete from Books", err);
        }

        else if (!err) {
            console.log("Successful delete from BookedTables, cascades to delete from Books too");

            if(isUpdate === "false") {
                let delete_query2 = sql_query.deleteConfirmedBooking;
                pool.query(delete_query2, [req.user.username, rname, bid], (err, data) => {
                  if(err) {
                      console.error("Fail to delete from ConfirmedBookings", err);
                  }
                  else if (!err) {
                      console.log("Successful delete from ConfirmedBookings, cascades to delete from Ratings");
                  }
                });
                let update_query = sql_query.updateAward;
                pool.query(update_query, [-100, req.user.username], (err, data) => {
                    if (err) {
                        console.error("Fail to update Awards", err);
                    }

                    else if (!err) {
                        console.log("Successful update from Awards, minus 100 points");
                    }
                });

                //remove from confirmedBookings, cascade deletes in ratings too
                //minus 100 from awards

            }
            if (isUpdate === "true") {
                let newRname = req.body.rname;
                let newBid = req.body.bid;
                let newPax = req.body.pax;
                let newReservationTime = req.body.reservationTime;
                let newReservationDate = req.body.reservationDate;
                //check if there is such a vacancy given all the above parameters (only need TID output)
                let select_query = checkForVacancyForUpdatedReservation;


                pool.query(select_query, [newRname, newBid, newPax, newReservationTime, newReservationDate], (err,data) => {
                  if(err) {
                    console.log("failed to find vacancy!");
                  }
                  else {
                      //if there is, insert into bookedTables,  Books (dont have to insert confirmedBookings as entry remains same
                  }
                })

                //if there is, insert into bookedTables,  Books (dont have to insert confirmedBookings as entry remains same
                //needed details => bookedTables : rname, bid, tid, capacity  --should change to paxNo not capacity, bookedTimeslot ,bookedDate
                //=>  Books: userName, rname, bid, tid, pax, reservationTime, reservationDate
            }
        }
    });
    res.redirect("/");
}




const pad = utils.pad;

function index(req, res, next) {

  let user = req.user;
  let time = utils.getTime();
  let dateInStr = utils.getDateInStr();
  const title = 'Looking for places to eat?';

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

  let arguments = [username, rname, location, date, reservationTime, cuisineType, paxNo];

  pool.query(insertQuery, arguments, (err, data) => {
    if(!err) {
      console.log("successful insertion into UserPreferences Table");
    }
    else
      console.error("failed insertion into UserPreferences Table", err);
  });
  return next();
}

function search_restaurant(req, res, next) {
  let ctx = 0, avg = 0, table
  let searchQuery = sql_query.search_result;
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
    rname = 'SELECT DISTINCT rname FROM branches';
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

  reservationTime = pad(reservationTime);

  searchQuery = searchQuery.replace('$4', reservationTime);
  searchQuery = searchQuery.replace('$4', reservationTime);
  searchQuery = searchQuery.replace('$4', reservationTime);
  searchQuery = searchQuery.replace('$4', reservationTime);

  if(paxNo === '')  {
    paxNo = 2; //by default
  }

  searchQuery = searchQuery.replace('$5', paxNo);

  date = pad(date);

  searchQuery = searchQuery.replace('$6', date);

  console.log("SEARCHQUERY " + searchQuery);

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

function booking(req, res, next) {
    let rname = req.body.rname;
    let bid = req.body.bid;
    let location = req.body.location;
    let reservationTime = req.body.reservationTime;
    let reservationDate = req.body.reservationDate;
    let paxNo = req.body.pax;
    let query = sql_query.findMinMaxHourOfABranch;

    pool.query(query, [rname, bid], (err, data) => {

        // Get menu items for this restaurant
        let subquery = sql_query.getMenuItems;

        pool.query(subquery, [rname], (err1, data1) => {
            let menu, menuCount;

            if (err1) {
                console.error("CANNOT GET MENU items")
            }
            else if (!data1.rows || data1.rows.length === 0) {
                menuCount = 0;
                menu = [];
            } else {
                menu = data1.rows;
                let getMenuCount = (menu) => {
                    let count = 0;
                    for (let i = 0; i < menu.length; i++) {
                        if (i === 0) {
                            count++;
                        } else if (menu[i].menuname !== menu[i - 1].menuname) {
                            count++
                        }
                    }
                    return count
                };
                menuCount = getMenuCount(menu);
                menu = utils.separateData(menu, menuCount)
            }
            let auth = req.isAuthenticated();
            let user = req.user;

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

    let queryArgs = [req.user.username, rname, bid];

    pool.query(insertQuery, queryArgs, (err, data) => {
        if(!err) {
            console.log("Successful insertion into ConfirmedBookings Table");
        }
        else {
            console.log("Failed insertion into ConfirmedBookings Table");
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

    let selectQuery = sql_query.find_tid;
    let insertQuery = sql_query.insertBooks;

    if(req.user === undefined) {
        return next();
    }

    pool.query(selectQuery, [rname, bid, pax], (err, data) => {
        if(!err) {
            let arguments = [req.user.username, rname, bid, data.rows[0].tid,
                pax, reservationTime, reservationDate];

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

function login(req, res, next) {
  res.render('signin', {title: 'Look4Makan', loginPage: true});
}

function logout(req, res, next) {
  req.session.destroy();
  req.logout();
  res.redirect('/')
}

function error(err, res) {
  res.render('error', {message: 'ERROR OCCURED', error: err});
}

function insertIntoBookedTables(req, res, next) {
    let args = req.body;
    // console.log(req.body)
    let rname = args.rname;
    let location = args.location;
    let time = args.reservationTime;
    let date = args.reservationDate;
    let bid = args.bid;
    let pax = args.pax;
    let queryArgs = [date, time, rname, pax, location, bid];

    pool.query(sql_query.find_empty_tables, queryArgs, (err, data) => {
        if(err) {
            console.error("ERROR", err)
        } else {
            if (data.rows.length === 0) {
                console.log("No empty tables found")
            } else {
                console.log("table found, inserting into bookedTables,", data.rows);
                let args = data.rows[0];
                let rname = args.rname;
                let bid = args.bid;
                let tid = args.tid;
                let queryArgs = [
                    rname,
                    bid,
                    tid,
                    time,
                    date,
                ];
                console.log("to be inserted", queryArgs);

                pool.query(sql_query.insert_into_bookedtables, queryArgs, (err, data) => {
                    if (err) {
                        console.error("Insertion into bookedtables Fail!", err);
                        return next()
                    } else {
                        console.log('Insertion into bookedtables: Success');
                        return next()
                    }
                })

            }
        }
    })
    // next();
}

function contact (req, res, next) {

    res.render("contact", {auth : req.isAuthenticated()});
}


function restaurant(req, res, next) {
    let rname = req.query.rname;
    const time = utils.getTime();
    let query = sql_query.getRestaurant;
    pool.query(query, [rname, time], (err, data) => {
        let table, count, auth
        let date = utils.getDateInStr();

        if (err) {
            error(err, res)
        } else if (!data.rows || data.rows.length === 0) {
            table = [];
            count = 0
        } else {
            table = data.rows;
            count = data.rows.length;
            rname = table[0].rname
        }

        // Get menu items for this restaurant
        let subquery = sql_query.getMenuItems;
        pool.query(subquery, [rname], (err, data) => {
            let menu, menuCount;

            if (err) {
                console.error("CANNOT GET MENU items")
            } else if (!data.rows || data.rows.length === 0) {
                menuCount = 0;
                menu = []
            } else {
                menu = data.rows;
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
                };
                menuCount = getMenuCount(menu);
                menu = utils.separateData(menu, menuCount);
                console.log("The menu count is: ",menuCount);
            }

            auth = req.isAuthenticated();
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

module.exports = initRouter;
