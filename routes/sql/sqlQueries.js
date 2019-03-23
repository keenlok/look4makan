const findAllAvailableRestaurants = 'SELECT rname, location FROM ((advertises  natural join restaurants) natural join branches) R WHERE EXISTS ( SELECT 1 FROM freetables F WHERE F.rid = R.rid AND F.bid = R.bid AND F.availableSince < $1);';

module.exports = {findAllAvailableRestaurants};