const get_restaurant = 'WITH restaurantStatus AS ( SELECT rname, bid, COUNT(tid) AS num FROM branchtables B ' +
    'WHERE NOT EXISTS ( SELECT 1 FROM bookedtables BT WHERE BT.tid = B.tid AND BT.bookeddate = $1 AND ' +
    'BT.bookedtimeslot >= $2 AND BT.bookedtimeslot < $2 ) GROUP BY rname, bid ) ' +
    'SELECT DISTINCT B.rname, openinghours, location, CASE WHEN (opentime > $2 OR closeTime < $2) ' +
    'THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' WHEN num IS NULL THEN \'UNAVAILABLE\' END AS status ' +
    'FROM branches B LEFT JOIN restaurantStatus RS ON B.bid = RS.bid AND B.rname = RS.rname WHERE B.rname = $3 ;';

const find_restaurant = 'WITH restaurantStatus AS ( SELECT rname, bid, COUNT(tid) AS num FROM branchtables B ' +
    'WHERE NOT EXISTS ( SELECT 1 FROM bookedtables BT WHERE BT.tid = B.tid AND BT.bookeddate = $1 AND BT.bookedtimeslot >= $2 AND ' +
    'BT.bookedtimeslot < $2 ) GROUP BY rname, bid ) ' +
    'SELECT DISTINCT B.rname, openinghours, location, CASE WHEN (opentime > $2 OR closeTime < $2) THEN \'CLOSED\' ' +
    'WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' WHEN num IS NULL THEN \'UNAVAILABLE\' END AS status ' +
    'FROM branches B LEFT JOIN restaurantStatus RS ON B.bid = RS.bid AND B.rname = RS.rname WHERE LOWER(B.rname) LIKE $3;';

const add_user = 'INSERT INTO diners (userName, password, firstName, lastName, isAdmin) VALUES ($1, $2, $3, $4, FALSE);';

const setup_user_awards = 'INSERT INTO awards (username, awardpoints) VALUES ($1, $2);';

const userpass = 'SELECT * FROM diners WHERE username = $1';


//used for home page multi-search option   (CHECK : Aaron)
const all_locations = "select * from Locations;";

const all_cuisines = "select * from CuisineTypes;";

const all_rname= "select rname from Restaurants;";

const all_timeSlots= "select * from Time;";


//used for Main Feature  (CHECKED: Aaron)
const insertUserPreference =  'INSERT INTO UserPreferences (userName, preferredRname, preferredLoc, preferredDate,' +
    ' preferredTime, cuisineType, paxNum) VALUES ($1, $2, $3, $4, $5, $6, $7) ' +
    'ON CONFLICT (username) DO UPDATE SET preferredrname = EXCLUDED.preferredrname,' +
    'preferredloc = EXCLUDED.preferredloc, preferreddate = EXCLUDED.preferreddate, ' +
    'preferredTime = EXCLUDED.preferredtime, cuisinetype = EXCLUDED.cuisinetype, paxnum = EXCLUDED.paxnum;';

//this is the result to be displayed after user enters preferences in home page
const search_result = 'SELECT distinct rname, bid, openingHours, location ' +
    'FROM branches B NATURAL JOIN advertises A NATURAL JOIN branchTables BT ' +
    'WHERE B.rname IN ($1) AND B.location IN ($2) AND ' +
    'cuisineType IN ($3) AND B.openTime <= $4 AND ' +
    'B.closeTime >= $4::time + \'01:00:00\' AND BT.capacity >= $5 AND ' +
    'NOT EXISTS (SELECT 1 FROM bookedtables BKT ' +
    'WHERE BKT.bid = BT.bid AND BT.rname = BKT.rname ' +
    'AND BT.tid = BKT.tid AND BKT.bookedtimeslot >= $4 ' +
    'AND BKT.bookedtimeslot - \'01:00:00\' < $4 AND BKT.bookeddate = $6) AND' +
    '($6  > current_date or ($6 = current_date and $4 >= localtime));';

//used in /bookings page to ensure the change in reservationTime is limited to opening hours of that same branch
const min_max_hour_of_a_branch = "SELECT openTime, closeTime FROM Branches B " +
    "WHERE B.rname = $1 AND B.bid = $2;";

//used in /bookings page
const get_menu_items = 'SELECT DISTINCT menuname, foodname, price ' +
    'FROM menu M NATURAL JOIN menuitems F NATURAL JOIN sells S ' +
    'WHERE S.rname = $1 ORDER BY menuname;';


const insertConfirmedBooking =  "INSERT INTO ConfirmedBookings (userName, rname, bid) VALUES ($1, $2, $3);";
   // " ON CONFLICT (username, rname, bid) DO UPDATE SET username = EXCLUDED.username, " +
   // " rname = EXCLUDED.rname, bid = EXCLUDED.bid;";

//find the best-fit tid given a bid and rname
const find_tid_given_bid_rname = "SELECT tid from BranchTables BT WHERE BT.rname = $1 AND " +
    "BT.bid = $2 AND BT.capacity >= $3 ORDER BY capacity limit 1;";

const insertBooks =  "INSERT INTO Books (userName, rname, bid, tid , pax, reservationTime, reservationDate) " +
    "VALUES ($1, $2, $3, $4, $5, $6, $7);";

const updateAward = "UPDATE Awards  SET awardpoints = awardpoints + $1 WHERE username = $2;";


const deleteRating = "DELETE FROM Ratings WHERE username = $1 AND rname = $2 AND bid = $3;";

const findAllUserBookings = "SELECT rname, bid FROM confirmedBookings WHERE username = $1;";

const findAllUserBooks = "SELECT DISTINCT rname, bid, tid, pax, reservationTime, reservationDate " +
                            "FROM Books WHERE username = $1;";

const findRatingsGivenUsernameRname = "SELECT rating FROM Ratings WHERE rname = $1 AND username = $2 and bid = $3;";

const insertIntoRatings = "INSERT INTO Ratings (rating, userName, rname, bid) VALUES ($1, $2, $3, $4) " +
    "ON CONFLICT (username, rname, bid) DO UPDATE SET rating = EXCLUDED.rating";

const deleteBookedTable = "DELETE FROM BookedTables WHERE rname = $1 AND bid = $2 AND " +
    "tid = $3 AND bookedTimeslot >= $4 AND " +
    "bookedTimeslot < $4::time + \'01:00:00\' AND bookedDate = $5;";

const checkForVacancyForUpdatedReservation = "SELECT tid FROM branches B NATURAL JOIN branchTables BT"
    + " WHERE B.rname = $1 AND B.bid = $2 AND BT.capacity >= $3"
    + " AND B.openTime <= $4 AND B.closeTime  >= $4::time + \'01:00:00\'"
    + " AND NOT EXISTS (SELECT 1 FROM bookedtables BKT"
    + " WHERE BKT.bid = BT.bid AND BT.rname = BKT.rname AND BT.tid = BKT.tid"
    + " and BKT.bookeddate = $5 and BKT.bookedtimeslot = $4)"
    + " ORDER BY BT.capacity LIMIT 1;";

const deleteConfirmedBooking = "DELETE FROM ConfirmedBookings WHERE userName = $1 AND rname = $2 AND bid = $3;";

const insert_rname = 'INSERT INTO restaurants (rname) VALUES ($1);';

const insert_branch = 'INSERT INTO branches (rname, bid, location, openingHours, openTime, closeTime, cuisineType) ' +
                          'VALUES ($1, $2, $3, $4, $5, $6, $7);';

const insert_location = 'INSERT INTO locations (locname) VALUES ($1);';

const insert_menu = 'INSERT INTO menu (name) VALUES ($1);';

const insert_cuisine = 'INSERT INTO cuisinetypes (cuisinename) VALUES ($1);';

//used for admin rights, basic search
const menu = 'SELECT * FROM menu;';

const insert_into_menu = 'INSERT INTO  menuitems (menuname, foodname, price) VALUES ($1, $2, $3);';

const delete_old_entries = 'DELETE FROM bookedtables WHERE bookedTimeslot + \'0:15:00\' <= $1 AND bookedDate <= $2;';

const delete_old_entries_for_testing = 'DELETE FROM bookedtables WHERE bookedTimeslot + \'0:01:00\' <= $1 AND bookedDate <= $2;';

const insert_into_bookedtables = 'INSERT INTO BookedTables (rname, bid, tid, bookedTimeslot, bookedDate) ' +
    'VALUES ($1, $2, $3, $4, $5), ' +
    '($1, $2, $3, $4::time + \'00:15:00\' , $5), ' +
    '($1, $2, $3, $4::time + \'00:30:00\' , $5), ' +
    '($1, $2, $3, $4::time + \'00:45:00\' , $5);';


const find_empty_tables = 'SELECT * FROM branchtables B NATURAL JOIN branches BB ' +
    'WHERE NOT EXISTS ( SELECT 1 FROM bookedtables T WHERE T.rname = B.rname AND ' +
    'T.bookeddate = $1 AND T.bookedtimeslot >= $2 AND T.bookedtimeslot < $2::time + \'01:00:00\') ' +
    'AND B.rname = $3 AND B.capacity >= $4 AND BB.location = $5 AND B.bid = $6 ' +
    'ORDER BY bid, tid LIMIT 1 ;';

const update_menu = 'UPDATE menu SET name = $2 WHERE name = $1;';

const update_cuisine = 'UPDATE cuisinetypes SET cuisinename = $2 WHERE cuisinename = $1;';

const delete_menu = 'DELETE FROM menu WHERE name = $1;';

const update_users = 'UPDATE diners SET firstname = $2, lastname = $3 WHERE username = $1;';

const delete_users = 'DELETE FROM diners WHERE username = $1;';

const get_users = 'SELECT * FROM diners;';

const findUserRewards = "SELECT awardpoints FROM Awards WHERE username = $1;";

const find_largest_empty_table = 'SELECT * FROM branchtables B NATURAL JOIN branches BB ' +
  'WHERE NOT EXISTS ( SELECT 1 FROM bookedtables T WHERE T.rname = B.rname AND ' +
  'T.bookeddate = $1 AND T.bookedtimeslot >= $2 AND T.bookedtimeslot < $2::time + \'01:00:00\') ' +
  'AND B.rname = $3 AND BB.location = $4' +
  'ORDER BY B.capacity LIMIT 1 ;';

const queries = {
  getRestaurant : get_restaurant,
  findRestaurant : find_restaurant,
  add_user : add_user,
  setup_user_awards: setup_user_awards,
  userpass : userpass,
  getAllLocations : all_locations,
  getAllCuisines : all_cuisines,
  getAllRestaurantName : all_rname,
  getAllTimeSlots : all_timeSlots,

  insertUserPreference : insertUserPreference,
  search_result : search_result,
  findMinMaxHourOfABranch : min_max_hour_of_a_branch,
  getMenuItems : get_menu_items,
  insertConfirmedBooking : insertConfirmedBooking,
  find_tid : find_tid_given_bid_rname,
  insertBooks : insertBooks,
  updateAward : updateAward,
  deleteRating : deleteRating,

  findAllUserBookings : findAllUserBookings,
  findRatingsGivenUsernameRname : findRatingsGivenUsernameRname,
  insertIntoRatings : insertIntoRatings,
  findAllUserBooks : findAllUserBooks,
  deleteBookedTable : deleteBookedTable,
  checkForVacancyForUpdatedReservation : checkForVacancyForUpdatedReservation,
  deleteConfirmedBooking : deleteConfirmedBooking,


  get_menu: menu,
  get_users: get_users,
  delete_old_entries: delete_old_entries,
  // delete_old_entries: delete_old_entries_for_testing, // use this when testing
  insert_rname: insert_rname,
  insert_branch: insert_branch,
  insert_location: insert_location,
  insert_menu: insert_menu,
  insert_cuisine: insert_cuisine,
  insert_into_menu: insert_into_menu,

  update_menu: update_menu,
  update_cuisine: update_cuisine,
  update_users: update_users,

  delete_menu: delete_menu,
  delete_users: delete_users,

  insert_into_bookedtables: insert_into_bookedtables,
  find_empty_tables: find_empty_tables,
  find_largest_empty_table: find_largest_empty_table,

  findUserRewards: findUserRewards
};

module.exports = queries;
