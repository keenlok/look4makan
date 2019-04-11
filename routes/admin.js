const sql_query = require('./sql/sqlQueries')
const passport = require('passport')
const bcrypt = require('bcrypt')
const utils = require('./utils/util')

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const round = 10;
const salt  = bcrypt.genSaltSync(round);

/*  --- Admin functions ---  */

// The main admin page with 3 buttons
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

// Update data page
function updateData (req, res, next) {
  let user = req.user
  if (typeof user === "undefined") {
    res.redirect('/') // Prevent unauthenticated access to this page
  }
  let date = utils.getDateInStr()

  pool.query(sql_query.get_menu, (err, data) => {
    let menu = data.rows
    pool.query(sql_query.getAllCuisines, (err, data) => {
      let cuisine = data.rows
      res.render('admin_update', {
        page: "Admin Update",
        dateInStr: date,
        auth: true,
        user: user,
        menu: menu,
        cuisine: cuisine
      })
    })
  })
}

// insert data page
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
      console.log("Successfully queried location data")
      let location = data.rows
      pool.query(sql_query.getAllCuisines, (err, data) => {
        if (err) {
          console.error("Error getting Locations", err)
        } else {
          console.log("Successfully queried cuisine data")
          let cuisine = data.rows
          pool.query(sql_query.get_menu, (err, data) => {
            if (err) {
              console.error("Error getting menus", err)
            } else {
              let menu = data.rows
              res.render('admin_insert', {
                page: "Admin Insert",
                dateInStr: date,
                auth: true,
                user: user,
                location: location,
                cuisine: cuisine,
                menu: menu
              })
            }
          })
        }
      })
    }
  })
}

module.exports.adminDashboard = adminDashboard
module.exports.updateData = updateData
module.exports.insertData = insertData


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

function insertLocations(req, res, next) {
  let location = req.body.location
  pool.query(sql_query.insert_location, [location], (err, data) => {
    if (err) {
      console.error("Error in adding location", err)
      res.redirect('/edit/insert?location=fail')
    } else {
      console.log("successfully added location", location)
      res.redirect('/edit/insert?location=success')
    }
  })
}

function insertMenu(req, res, next) {
  let menu = req.body.menu
  pool.query(sql_query.insert_menu, [menu], (err, data) => {
    if (err) {
      console.error("Error in adding menu", err)
      res.redirect('/edit/insert?menu=fail')
    } else {
      console.log("successfully added menu", menu)
      res.redirect('/edit/insert?menu=success')
    }
  })
}

function insertCuisine(req, res, next) {
  let cuisine = req.body.cuisine
  pool.query(sql_query.insert_cuisine, [cuisine], (err, data) => {
    if (err) {
      console.error("Error in adding cuisine", err)
      res.redirect('/edit/insert?cuisine=fail')
    } else {
      console.log("successfully added cuisine", cuisine)
      res.redirect('/edit/insert?cuisine=success')
    }
  })
}

function insertIntoMenu(req, res, next) {
  console.log(req.body)
  let menu = req.body.menuname
  let food = req.body.food
  let price = req.body.price
  pool.query(sql_query.insert_into_menu, [menu, food, price], (err, data) => {
    if (err) {
      console.error("Error in adding into menu " + menu + " with food "+ food, err)
      res.redirect('/edit/insert?intomenu=fail')
    } else {
      console.log("successfully added into menu", menu, food, price)
      res.redirect('/edit/insert?intomenu=success')
    }
  })
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

module.exports.insertIntoDiners = insertIntoDiners;
module.exports.insertIntoRestaurantsBranches = insertIntoRestaurantsBranches;
module.exports.insertLocations = insertLocations;
module.exports.insertCuisine = insertCuisine;
module.exports.insertMenu = insertMenu;
module.exports.insertIntoMenu = insertIntoMenu;
module.exports.search = search;


function updateMenu (req, res, next) {
  console.log(req.body)
  let oldmenu = req.body.oldmenu
  let newmenu = req.body.newmenu

  pool.query(sql_query.update_menu, [oldmenu, newmenu], (err, data) => {
    if (err) {
      console.error('Error updating', err)
      res.redirect('/edit/update?menu=fail')
    } else {
      console.log('Successfully updated menu' + oldmenu + ' with ' + newmenu)
      res.redirect('/edit/update?menu=success')
    }
  })
}

function deleteMenu (req, res, next) {
  console.log(req.body)
  let oldmenu = req.body.oldmenu

  pool.query(sql_query.delete_menu, [oldmenu], (err, data) => {
    if (err) {
      console.error('Error deleting', err)
      res.redirect('/edit/update?deletemenu=fail')
    } else {
      console.log('Successfully deleted menu', oldmenu)
      res.redirect('/edit/update?deletemenu=success')
    }
  })
}

function updateCuisine (req, res, next) {
  console.log(req.body)
  let oldcuisine = req.body.oldcuisine
  let newcuisine = req.body.newcuisine

  pool.query(sql_query.update_cuisine, [oldcuisine, newcuisine], (err, data) => {
    if (err) {
      console.error('Error updating', err)
      res.redirect('/edit/update?cuisine=fail')
    } else {
      console.log('Successfully updated cuisine types!' + oldcuisine + ' with ' + newcuisine)
      res.redirect('/edit/update?cuisine=success')
    }
  })
}



module.exports.updateMenu = updateMenu
module.exports.deleteMenu = deleteMenu
module.exports.updateCuisine = updateCuisine








