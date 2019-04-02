delete from advertises;
delete from restaurants;
delete from branches;
delete from freetables;

insert into restaurants (rname) values
('GoodFood'),
('HelloWorld');

insert into CuisineTypes (cuisineName) values
('Chinese'),
('Western');

insert into branches (rname, bid, location, openinghours, opentime, closetime, cuisinetype, postalCode) values
('GoodFood', 1, 'Jurong Point', '10am - 10pm', '10:00:00', '22:00:00', 'Chinese', 648886),
('GoodFood', 2, 'Clementi Mall', '10am - 10pm', '10:00:00', '22:00:00', 'Chinese', 129588),
('HelloWorld', 1, 'Jurong Point', '10am - 10pm', '10:00:00', '22:00:00', 'Western', 648886);


insert into advertises (rname, bid) values
('GoodFood', 1),
('GoodFood', 2),
('HelloWorld', 1);

insert into freetables (rname, bid, tid, pax, availablesince) values
('GoodFood', 1, 1, 4, '10:00:00'),
('GoodFood', 1, 2, 4, '10:00:00'),
('GoodFood', 1, 3, 4, '10:00:00'),
('GoodFood', 1, 4, 4, '10:00:00'),
('GoodFood', 1, 5, 4, '10:00:00'),
('GoodFood', 1, 6, 4, '10:00:00'),
('GoodFood', 2, 1, 4, '10:00:00'),
('GoodFood', 2, 2, 4, '10:00:00'),
('GoodFood', 2, 3, 4, '10:00:00'),
('GoodFood', 2, 4, 4, '10:00:00'),
('GoodFood', 2, 5, 4, '10:00:00'),
('GoodFood', 2, 6, 4, '10:00:00'),
('HelloWorld', 1, 1, 4, '10:00:00'),
('HelloWorld', 1, 2, 4, '10:00:00'),
('HelloWorld', 1, 3, 4, '10:00:00'),
('HelloWorld', 1, 4, 4, '10:00:00'),
('HelloWorld', 1, 5, 4, '10:00:00'),
('HelloWorld', 1, 6, 4, '10:00:00')
;