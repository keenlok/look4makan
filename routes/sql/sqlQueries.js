
const available_restaurants = 'SELECT R.rname, location FROM ((advertises  natural join restaurants) natural join branches) R WHERE EXISTS ( SELECT 1 FROM freetables F WHERE F.rname = R.rname AND F.bid = R.bid AND F.availableSince < $1);';

const branch_w_status = 'WITH restaurantStatus AS ( SELECT rname, bid, COUNT(tid) AS num FROM freetables GROUP BY rname, bid ) SELECT R.rname, location, CASE WHEN (opentime > $1 OR closeTime < $1) THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' WHEN num = NULL THEN \'UNAVAILABLE\' END AS status FROM (advertises NATURAL JOIN restaurants NATURAL JOIN branches) R LEFT JOIN restaurantStatus S ON R.rname = S.rname AND R.bid = S.bid;';

const get_restaurant = 'WITH restaurantStatus AS ( SELECT rname, bid, COUNT(tid) AS num FROM freetables GROUP BY rname, bid ) SELECT distinct R.rname, openinghours, location, CASE WHEN (opentime > $2 OR closeTime < $2) THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' WHEN num IS NULL THEN \'UNAVAILABLE\' END AS status FROM (restaurants NATURAL JOIN branches) R LEFT JOIN restaurantStatus S ON R.rname = S.rname AND R.bid = S.bid WHERE R.rname = $1;'

const find_restaurant = 'WITH restaurantStatus AS ( SELECT rname, bid, COUNT(tid) AS num FROM freetables GROUP BY rname, bid ) SELECT distinct R.rname, openinghours, location, CASE WHEN (opentime > $2 OR closeTime < $2) THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' WHEN num IS NULL THEN \'UNAVAILABLE\' END AS status FROM (restaurants NATURAL JOIN branches) R LEFT JOIN restaurantStatus S ON R.rname = S.rname AND R.bid = S.bid WHERE LOWER(R.rname) LIKE $1;'

const find_postal_code = 'WITH restaurantStatus AS ( SELECT rname, bid, COUNT(tid) AS num FROM freetables GROUP BY rname, bid ) SELECT DISTINCT R.rname, openinghours, location, CASE WHEN (opentime > $1 OR closeTime < $1) THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' END AS status FROM (restaurants R LEFT JOIN branches B ON R.rname = B.rname) LEFT JOIN restaurantStatus S ON R.rname = S.rname WHERE ABS(B.postalCode - $2) <= 9999;'

const add_user = 'INSERT INTO diners (userName, password, firstName, lastName, isAdmin) VALUES ($1, $2, $3, $4, FALSE);'


//should change to F.availableDate = $6 but dont do so cause will cause result to fail to show up at the moment
const find_user_preference = 'SELECT distinct rname, bid, openingHours, location FROM branches B NATURAL JOIN branchTables BT WHERE B.rname IN ($1) AND B.location IN ($2) AND cuisineType IN ($3) AND B.openTime <= $4 AND B.closeTime >= $4 AND BT.capacity >= $5 AND NOT EXISTS (SELECT 1 FROM bookedtables BKT WHERE BKT.bid = BT.bid AND BT.rname = BKT.rname AND BT.tid = BKT.tid);';

const userpass = 'SELECT * FROM diners WHERE username = $1'

const get_menu_items = 'SELECT DISTINCT menuname, foodname, price FROM menu M NATURAL JOIN menuitems F NATURAL JOIN sells S WHERE S.rname = $1 ORDER BY menuname;'

const all_locations = "select * from Locations;";

const all_cuisines = "select * from CuisineTypes;";

const all_rname= "select rname from Restaurants;";

const min_max_hour_of_a_branch = "SELECT openTime, closeTime FROM Branches B WHERE B.rname = $0 AND B.bid = $1;";

const queries = {
  findAllAvailableRestaurants : available_restaurants,
  allBranchWithStatus : branch_w_status,
  findRestaurant : find_restaurant,
  getRestaurant : get_restaurant,
  findWithPostCode : find_postal_code,
  findWithUserPreference : find_user_preference,
  add_user : add_user,
  userpass : userpass,
  getMenuItems : get_menu_items,
  getAllLocations : all_locations,
  getAllCuisines : all_cuisines,
  getAllRestaurantName : all_rname,
  findMinMaxHourOfABranch : min_max_hour_of_a_branch
}

module.exports = queries
