
const available_restaurants = 'SELECT rname, location FROM ((advertises  natural join restaurants) natural join branches) R WHERE EXISTS ( SELECT 1 FROM freetables F WHERE F.rid = R.rid AND F.bid = R.bid AND F.availableSince < $1);';
const branch_w_status = 'WITH restaurantStatus AS ( SELECT rid, bid, COUNT(tid) AS num FROM freetables GROUP BY rid, bid ) SELECT rname, location, CASE WHEN (opentime > $1 OR closeTime < $1) THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' END AS status FROM (advertises NATURAL JOIN restaurants NATURAL JOIN branches) R LEFT JOIN restaurantStatus S ON R.rid = S.rid AND R.bid = S.bid;';
const get_restaurant = 'WITH restaurantStatus AS ( SELECT rid, bid, COUNT(tid) AS num FROM freetables GROUP BY rid, bid ) SELECT DISTINCT rname, location, openinghours, opentime, closetime, CASE WHEN (opentime > $1 OR closeTime < $1) THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' END AS status FROM (restaurants R LEFT JOIN branches B ON R.rid = B.rid) LEFT JOIN restaurantStatus S ON R.rid = S.rid WHERE R.rname = $2;';
const find_restaurant = 'WITH restaurantStatus AS ( SELECT rid, bid, COUNT(tid) AS num FROM freetables GROUP BY rid, bid ) SELECT distinct rname, openinghours, location, CASE WHEN (opentime > $1 OR closeTime < $1) THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' END AS status FROM (restaurants NATURAL JOIN branches) R LEFT JOIN restaurantStatus S ON R.rid = S.rid WHERE LOWER(rname) LIKE $2;'
const find_postal_code = 'WITH restaurantStatus AS ( SELECT rid, bid, COUNT(tid) AS num FROM freetables GROUP BY rid, bid ) SELECT DISTINCT rname, openinghours, location, CASE WHEN (opentime > $1 OR closeTime < $1) THEN \'CLOSED\' WHEN num > 0 THEN \'AVAILABLE\' WHEN num = 0 THEN \'FULL\' END AS status FROM (restaurants R LEFT JOIN branches B ON R.rid = B.rid) LEFT JOIN restaurantStatus S ON R.rid = S.rid WHERE ABS(B.postalCode - $2) <= 9999;'

module.exports = {
    findAllAvailableRestaurants: available_restaurants,
    allBranchWithStatus: branch_w_status,
    findRestaurant: find_restaurant,
    findWithPostCode: find_postal_code,
};