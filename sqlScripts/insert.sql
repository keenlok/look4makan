delete from advertises;
delete from restaurants;
delete from branches;
delete from freetables;

insert into restaurants (rid, rname) values
(1, 'GoodFood'),
(2, 'HelloWorld');

insert into branches (rid, bid, location, openinghours, opentime, closetime, cuisinetype) values
(1, 1, 'Jurong Point', '10am - 10pm', '10:00:00', '22:00:00', 'chinese'),
(1, 2, 'Clementi Mall', '10am - 10pm', '10:00:00', '22:00:00', 'chinese'),
(2, 1, 'Jurong Point', '10am - 10pm', '10:00:00', '22:00:00', 'western');

insert into advertises (rid, bid) values
(1, 1),
(1, 2),
(2, 1);

insert into freetables (rid, bid, tid, pax, availablesince) values
(1, 1, 1, 4, '10:00:00'),
(1, 1, 2, 4, '10:00:00'),
(1, 1, 3, 4, '10:00:00'),
(1, 1, 4, 4, '10:00:00'),
(1, 1, 5, 4, '10:00:00'),
(1, 1, 6, 4, '10:00:00'),
(1, 2, 1, 4, '10:00:00'),
(1, 2, 2, 4, '10:00:00'),
(1, 2, 3, 4, '10:00:00'),
(1, 2, 4, 4, '10:00:00'),
(1, 2, 5, 4, '10:00:00'),
(1, 2, 6, 4, '10:00:00'),
(2, 1, 1, 4, '10:00:00'),
(2, 1, 2, 4, '10:00:00'),
(2, 1, 3, 4, '10:00:00'),
(2, 1, 4, 4, '10:00:00'),
(2, 1, 5, 4, '10:00:00'),
(2, 1, 6, 4, '10:00:00')
;