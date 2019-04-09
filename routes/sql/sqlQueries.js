
// const available_restaurants = 'SELECT R.rname, location FROM ((advertises  natural join restaurants) natural join branches) R WHERE EXISTS ( SELECT 1 FROM freetables F WHERE F.rname = R.rname AND F.bid = R.bid AND F.availableSince < $1);';
//
// const branch_w_status = 'WITH restaurantStatus AS ( SELECT rname, bid, COUNT(tid) AS num FROM freetables GROUP BY rname, bid ) SELECT R.rname, location, CASE WHEN (opentime > $1 OR closeTime < $1) THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' WHEN num = NULL THEN \'UNAVAILABLE\' END AS status FROM (advertises NATURAL JOIN restaurants NATURAL JOIN branches) R LEFT JOIN restaurantStatus S ON R.rname = S.rname AND R.bid = S.bid;';

const get_restaurant = 'SELECT distinct R.rname, openinghours, location, CASE WHEN (opentime > $2 OR closeTime < $2)' +
  ' THEN \'CLOSED\' END AS status FROM (restaurants NATURAL JOIN branches) R WHERE R.rname = $1;'

const find_restaurant = 'SELECT distinct R.rname, openinghours, location, CASE WHEN (opentime > $2 OR closeTime <' +
  ' $2) THEN \'CLOSED\'  END AS status FROM (restaurants NATURAL JOIN branches) R WHERE LOWER(R.rname) LIKE $1;'

// const find_postal_code = 'WITH restaurantStatus AS ( SELECT rname, bid, COUNT(tid) AS num FROM freetables GROUP BY rname, bid ) SELECT DISTINCT R.rname, openinghours, location, CASE WHEN (opentime > $1 OR closeTime < $1) THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' END AS status FROM (restaurants R LEFT JOIN branches B ON R.rname = B.rname) LEFT JOIN restaurantStatus S ON R.rname = S.rname WHERE ABS(B.postalCode - $2) <= 9999;'
// //
  const add_user = 'INSERT INTO diners (userName, password, firstName, lastName, isAdmin) VALUES ($1, $2, $3, $4, FALSE);'


//should change to F.availableDate = $6 but dont do so cause will cause result to fail to show up at the moment
const find_user_preference = 'SELECT distinct rname, bid, openingHours, location FROM branches B NATURAL JOIN branchTables BT WHERE B.rname IN ($1) AND B.location IN ($2) AND cuisineType IN ($3) AND B.openTime <= $4 AND B.closeTime >= $4 AND BT.capacity >= $5 AND NOT EXISTS (SELECT 1 FROM bookedtables BKT WHERE BKT.bid = BT.bid AND BT.rname = BKT.rname AND BT.tid = BKT.tid);';

const userpass = 'SELECT * FROM diners WHERE username = $1'

const get_menu_items = 'SELECT DISTINCT menuname, foodname, price FROM menu M NATURAL JOIN menuitems F NATURAL JOIN sells S WHERE S.rname = $1 ORDER BY menuname;'

const all_locations = "select * from Locations;";

const all_cuisines = "select * from CuisineTypes;";

const all_rname= "select rname from Restaurants;";

const all_timeSlots= "select * from Time;";

const min_max_hour_of_a_branch = "SELECT openTime, closeTime FROM Branches B WHERE B.rname = $1 AND B.bid = $2;";

const insertUserPreference =  'INSERT INTO UserPreferences (userName, preferredRname, preferredLoc, preferredDate,' +
  ' preferredTime, cuisineType, paxNum) VALUES ($1, $2, $3, $4, $5, $6, $7);';

const insertConfirmedBooking =  "INSERT INTO ConfirmedBookings (userName, rname, bid) VALUES ($1, $2, $3);";

const find_tid_given_bid_rname = "SELECT tid from BranchTables BT WHERE BT.rname = $1 AND BT.bid = $2 AND BT.capacity >= $3 ORDER BY capacity limit 1;";

const insertBooks =  "INSERT INTO Books (userName, rname, bid, tid , pax, reservationTime, reservationDate) VALUES ($1, $2, $3, $4, $5, $6, $7);";

const delete_old_entries = 'DELETE FROM books WHERE reservationtime + \'1:00:00\' <= $1 AND reservationdate <= $2;';

const queries = {
  findRestaurant : find_restaurant,
  getRestaurant : get_restaurant,
  findWithUserPreference : find_user_preference,
  add_user : add_user,
  userpass : userpass,
  getMenuItems : get_menu_items,
  getAllLocations : all_locations,
  getAllCuisines : all_cuisines,
  getAllRestaurantName : all_rname,
  getAllTimeSlots : all_timeSlots,
  findMinMaxHourOfABranch : min_max_hour_of_a_branch,
  insertUserPreference : insertUserPreference,
  insertConfirmedBooking : insertConfirmedBooking,
  insertBooks : insertBooks,
  find_tid : find_tid_given_bid_rname,
  delete_old_entries: delete_old_entries
}

module.exports = queries
