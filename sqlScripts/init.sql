-----------------------------------------------
--CREATE TABLES
-----------------------------------------------

drop table if exists Diners cascade;
drop table if exists Awards cascade;
drop table if exists ConfirmedBookings  cascade;
drop table if exists UserPreferences  cascade;
drop table if exists BranchTables  cascade;

drop table if exists Books  cascade;
drop table if exists Ratings  cascade;
drop table if exists Branches  cascade;
drop table if exists Restaurants  cascade;
drop table if exists Advertises  cascade;
drop table if exists Menu  cascade;
drop table if exists menuItems  cascade;
drop table if exists Sells  cascade;
drop table if exists CuisineTypes cascade;
drop table if exists Locations cascade;
drop table if exists Time cascade;
drop table if exists BookedTables cascade;


create table Time (
timeSlot time primary key,
timeSlotStr varchar(10) not null
);

create table Diners (
userName varchar(20) primary key,
firstName varchar(20) not null,
lastName varchar(20) not null,
password varchar(64) not null,
isAdmin boolean not null
);

create table Locations (
locName varchar(40) primary key
);

create table Restaurants (
rname varchar(40) primary key
);

create table CuisineTypes (
cuisineName varchar(10) primary key
);

--not sure
create table Awards(
userName varchar(20) primary key references diners,
awardPoints integer
);


create table ConfirmedBookings (
userName varchar(20),
rname varchar(40),
bid integer,
primary key (userName, rname, bid)
);

create table UserPreferences (
userName varchar(20),
preferredRname varchar(40),
preferredLoc varchar(40) references Locations,
preferredDate date not null,
preferredTime time not null,
cuisineType varchar(10) references CuisineTypes,
paxNum integer not null,
primary key (userName)
);

create table Branches (
rname varchar(40),
bid integer,
location varchar(40) references Locations not null,
openingHours varchar(20),
openTime time,
closeTime time,
cuisineType varchar(10) references CuisineTypes not null,
primary key (rname, bid)
);

create table BranchTables (
rname varchar(40),
bid integer,
tid integer,
capacity integer,
foreign key (rname, bid) references Branches,
primary key (rname, bid, tid)
);

create table BookedTables (
rname varchar(40),
bid integer,
tid integer,
--pax integer,  --should change to paxNo not capacity, i dont think need this
bookedTimeslot time,
bookedDate date,
foreign key (rname, bid, tid) references BranchTables,
primary key (rname, bid, tid, bookedTimeslot, bookedDate)
);


--problematic
create table Books (
userName varchar(20),
rname varchar(40),
bid integer,
tid integer,
reservationTime time,
reservationDate date,
pax integer not null,
foreign key (rname, bid, tid, reservationTime, reservationDate) references BookedTables
on delete cascade,
foreign key (userName) references userpreferences,
primary key (userName, rname, bid, tid, reservationTime, reservationDate)
);


create table Ratings (
rating integer check( rating >= 0 and rating <= 5 ),
userName varchar(20) references Diners,
rname varchar(40),
bid integer,
primary key (userName, rname, bid),
foreign key (userName, rname, bid) references ConfirmedBookings
);


create table Menu (
name varchar(50) primary key
);

create table Sells (
menuName varchar(50) references Menu on update cascade on delete cascade,
rname varchar(40),
bid integer,
primary key (menuName, rname, bid),
foreign key (rname,bid) references Branches
);


create table Advertises (
rname varchar(40)references Restaurants,
bid integer,
primary key (rname,bid),
foreign key (rname,bid) references Branches
);



create table menuItems (
menuName varchar(50) references Menu on update cascade on delete cascade,
foodName varchar(50),
price integer,
primary key (menuName,foodName, price)
);


-------------------------------------------------
--INSERT VALUES
-------------------------------------------------

delete from diners cascade;
delete from awards cascade;
delete from advertises cascade;
delete from restaurants cascade;
delete from Sells cascade;
delete from branches cascade;
delete from bookedtables cascade;
delete from CuisineTypes cascade;
delete from menuitems cascade;
delete from menu cascade;
delete from Locations cascade;
delete from Time cascade;


insert into diners (username, firstname, lastname, password, isAdmin) values
('lokeen', 'Lok', 'Keen', '$2b$10$QFg3/z/fXRaHlIWfftdGkOzw/AG7oDHnP8GeYSMbfzwFmW64mzGta', true),
('Aaron', 'Aaron', 'Seah', '$2b$10$9XVUf1t7lALBLQEPInsmGuzjcO3yOapp0DAKDVVSiCDWLc70VxxTC', true),
('alexis', 'Yuan', 'Hui', '$2b$10$QFg3/z/fXRaHlIWfftdGkOpzpCIFiBdzjDTOvq4XfbAeve/END7iW', true),
('nicpang', 'Nicholas', 'Pang', '$2b$10$QFg3/z/fXRaHlIWfftdGkOYmPwxzSrR/iCAyVatgCSJBd/7eBNfC.', true),
('madScientist', 'Morty', 'Rick', '$2b$10$QFg3/z/fXRaHlIWfftdGkOCwam0wCdfW9yfA7u93IsWL2DVSul.Ue', false);

insert into awards (username, awardpoints) values
('lokeen', 0),
('Aaron', 0),
('alexis', 0),
('nicpang', 0),
('madScientist', 0);


insert into menu (name) values
('MacDonalds Breakfast Menu'),
('MacDonalds Lunch Menu'),
('BurgerKing Breakfast Menu'),
('BurgerKing Lunch Menu'),
('Crystal Jade Main Menu'),
('Crystal Jade Promotion Menu'),

('Astons Western Menu'),
('Sakae Lunch Menu'),
('Sushi Express Menu'),
('Forlino Menu'),
('Exquisite Menu'),
('Thai Lunch Menu'),
('Yumyum Menu');


insert into menuitems (menuname, foodname, price) values
('MacDonalds Breakfast Menu', 'Big Breakfast', 5),
('MacDonalds Breakfast Menu', 'McMuffin' ,5),
('MacDonalds Breakfast Menu', 'Deluxe Breakfast', 7),
('MacDonalds Lunch Menu', 'McSpicy', 5),
('MacDonalds Lunch Menu', 'McChicken', 2),
('MacDonalds Lunch Menu', 'Fillet-o-Fish', 3),
('BurgerKing Breakfast Menu', 'Hot Milo', 2),
('BurgerKing Breakfast Menu', 'Hot Coffee', 2),
('BurgerKing Lunch Menu', 'Zinger Burger', 5),
('BurgerKing Lunch Menu', 'Cheese Fries', 3),
('Crystal Jade Promotion Menu', 'Siew Mai', 2),
('Crystal Jade Promotion Menu', 'Ha Kau', 2),
('Crystal Jade Main Menu', 'Mango Prawn Roll', 5),
('Crystal Jade Main Menu', 'Wasabi Prawn Roll', 5);


insert into Time (timeSlot, timeSlotStr)  values
('05:00:00', '5:00 am'), ('05:15:00', '5:15 am'), ('05:30:00', '5:30 am'), ('05:45:00', '5:45 am'),
('06:00:00', '6:00 am'), ('06:15:00', '6:15 am'), ('06:30:00', '6:30 am'), ('06:45:00', '6:45 am'),
('07:00:00', '7:00 am'), ('07:15:00', '7:15 am'), ('07:30:00', '7:30 am'), ('07:45:00', '7:45 am'),
('08:00:00', '8:00 am'), ('08:15:00', '8:15 am'), ('08:30:00', '8:30 am'), ('08:45:00', '8:45 am'),
('09:00:00', '9:00 am'), ('09:15:00', '9:15 am'), ('09:30:00', '9:30 am'), ('09:45:00', '9:45 am'),
('10:00:00', '10:00 am'), ('10:15:00', '10:15 am'), ('10:30:00', '10:30 am'), ('10:45:00', '10:45 am'),
('11:00:00', '11:00 am'), ('11:15:00', '11:15 am'), ('11:30:00', '11:30 am'), ('11:45:00', '11:45 am'),
('12:00:00', '12:00 pm'), ('12:15:00', '12:15 pm'), ('12:30:00', '12:30 pm'), ('12:45:00', '12:45 pm'),
('13:00:00', '1:00 pm'), ('13:15:00', '1:15 pm'), ('13:30:00', '1:30 pm'), ('13:45:00', '1:45 pm'),
('14:00:00', '2:00 pm'), ('14:15:00', '2:15 pm'), ('14:30:00', '2:30 pm'), ('14:45:00', '2:45 pm'),
('15:00:00', '3:00 pm'), ('15:15:00', '3:15 pm'), ('15:30:00', '3:30 pm'), ('15:45:00', '3:45 pm'),
('16:00:00', '4:00 pm'), ('16:15:00', '4:15 pm'), ('16:30:00', '4:30 pm'), ('16:45:00', '4:45 pm'),
('17:00:00', '5:00 pm'), ('17:15:00', '5:15 pm'), ('17:30:00', '5:30 pm'), ('17:45:00', '5:45 pm'),
('18:00:00', '6:00 pm'), ('18:15:00', '6:15 pm'), ('18:30:00', '6:30 m'), ('18:45:00', '6:45 pm'),
('19:00:00', '7:00 pm'), ('19:15:00', '7:15 pm'), ('19:30:00', '7:30 pm'), ('19:45:00', '7:45 pm'),
('20:00:00', '8:00 pm'), ('20:15:00', '8:15 pm'), ('20:30:00', '8:30 pm'), ('20:45:00', '8:45 pm'),
('21:00:00', '9:00 pm'), ('21:15:00', '9:15 pm'), ('21:30:00', '9:30 pm'), ('21:45:00', '9:45 pm'),
('22:00:00', '10:00 pm'), ('22:15:00', '10:15 pm'), ('22:30:00', '10:30 pm'), ('22:45:00', '10:45 pm'),
('23:00:00', '11:00 pm'), ('23:15:00', '11:15 pm'), ('23:30:00', '11:30 pm'), ('23:45:00', '11:45 pm');


insert into restaurants (rname) values
('MacDonalds'),
('BurgerKing'),
('Crystal Jade'),
('Astons'),
('Sushi Express'),
('Forlino'),
('Ristorante Da Valentino'),
('Thai Tantric Authentic Thai Cuisine'),
('NamNam');




insert into Locations (locName) values
('Jurong Point'),
('Centre Point'),
('Causeway Point'),
('Vivo City'),
('Clementi Mall'),
('Plaza Singapura'),
('Orchard Scape'),
('Kent Ridge Mall'),
('100am Mall'),
('Orchard Central'),
('Shaw Plaza'),
('Lucky Plaza'),
('Buona Vista');


insert into CuisineTypes (cuisineName) values
('Chinese'), ('Western'), ('Japanese'), ('Korean'),
('Italian'), ('French'), ('Indian'), ('Straits'), ('Malay'), ('Thai'), ('Vietnamese');





insert into branches (rname, bid, location, openinghours, opentime, closetime, cuisinetype) values
('MacDonalds', 1, 'Jurong Point', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('MacDonalds', 2, 'Clementi Mall', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('MacDonalds', 3, 'Vivo City', '8am - 12am', '08:00:00', '23:59:59', 'Western'),
('MacDonalds', 4, 'Plaza Singapura', '9.30am - 10pm', '09:30:00', '22:00:00', 'Western'),
('MacDonalds', 5, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('BurgerKing', 1, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('BurgerKing', 2, 'Plaza Singapura', '8am - 8pm', '08:00:00', '20:00:00', 'Western'),
('BurgerKing', 3, 'Causeway Point', '7am - 7pm', '07:00:00', '19:00:00', 'Western'),

('Crystal Jade', 1, 'Vivo City', '10am - 10pm', '10:00:00', '22:00:00', 'Chinese'),
--vary locations from here onwards
('Astons', 1, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Astons', 2, 'Plaza Singapura', '8am - 8pm', '08:00:00', '20:00:00', 'Western'),
('Astons', 3, 'Causeway Point', '7am - 7pm', '07:00:00', '19:00:00', 'Western'),
('Astons', 4, 'Centre Point', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),

('Sakae Sushi', 1, 'Orchard Scape', '11am - 9.30pm', '11:00:00', '21:30:00', 'Japanese'),
('Sakae Sushi', 2, 'Plaza Singapura', '12pm - 7.30pm', '12:00:00', '19:30:00', 'Japanese'),

('Sushi Express', 1, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Japanese'),
('Sushi Express', 2, 'Buona Vista', '12pm - 7.30pm', '12:00:00', '19:30:00', 'Japanese'),

('Forlino', 1, 'Orchard Scape', '1pm - 10pm', '13:00:00', '10:00:00', 'French'),
('Forlino', 2, 'Buona Vista', '2pm - 7.30pm', '14:00:00', '19:30:00', 'French'),

('Ristorante Da Valentino', 1, 'Orchard Scape', '1pm - 6.30pm', '13:00:00', '18:30:00', 'French'),

('Thai Tantric Authentic Thai Cuisine', 1, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Thai'),
('Thai Tantric Authentic Thai Cuisine', 2, 'Buona Vista', '12pm - 7.30pm', '10:00:00', '19:30:00', 'Thai'),

('NamNam', 1, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Vietnamese');





insert into advertises (rname, bid) values
('MacDonalds', 1),
('MacDonalds', 2),
('MacDonalds', 3),
('MacDonalds', 4),
('MacDonalds', 5),
('BurgerKing', 1),
('BurgerKing', 2),

('Crystal Jade', 1),
('Astons', 1),
('Astons', 2),

('Sushi Express', 1),
('Sushi Express', 2),

('Forlino', 1),
('Forlino', 2),
('Ristorante Da Valentino', 1),
('Thai Tantric Authentic Thai Cuisine', 1),
('NamNam', 1);




insert into BranchTables (rname, bid, tid, capacity) values
('MacDonalds', 1, 1, 4),
('MacDonalds', 1, 2, 2),
('MacDonalds', 1, 3, 4),
('MacDonalds', 1, 4, 5),
('MacDonalds', 2, 1, 4),
('MacDonalds', 3, 1, 4),
('BurgerKing', 1, 1, 2),
('Crystal Jade', 1, 1, 10),
('Astons', 1, 1, 3),
('Astons', 2, 1, 5),
('Sushi Express', 1, 1, 4),
('Sushi Express', 2, 2, 2),
('Forlino', 1, 1, 2),
('Forlino', 2, 1, 2),
('Forlino', 2, 2, 2),
('Ristorante Da Valentino', 1, 1, 1),
('Thai Tantric Authentic Thai Cuisine', 1, 1, 4),
('NamNam', 1, 1, 3);


/*
insert into BookedTables (rname, bid, tid, pax, bookedTimeslot, bookedDate) values
('Crystal Jade', 1, 1, 0, '23:00:00', '2019-05-16');
--('MacDonalds', 1, 1, 50, '10:00:00', '2019-04-11');
*/
insert into BookedTables (rname, bid, tid, bookedTimeslot, bookedDate) values
('Crystal Jade', 1, 1, '23:00:00', '2019-05-16');
--('MacDonalds', 1, 1, '10:00:00', '2019-04-11');




insert into Sells (menuname, rname, bid) values
('MacDonalds Breakfast Menu', 'MacDonalds', 1),
('MacDonalds Breakfast Menu', 'MacDonalds', 2),
('MacDonalds Breakfast Menu', 'MacDonalds', 3),
('MacDonalds Breakfast Menu', 'MacDonalds', 4),
('MacDonalds Breakfast Menu', 'MacDonalds', 5),
('MacDonalds Lunch Menu', 'MacDonalds', 1),
('MacDonalds Lunch Menu', 'MacDonalds', 2),
('MacDonalds Lunch Menu', 'MacDonalds', 3),
('MacDonalds Lunch Menu', 'MacDonalds', 4),
('MacDonalds Lunch Menu', 'MacDonalds', 5),
('BurgerKing Lunch Menu', 'BurgerKing', 1),
('BurgerKing Lunch Menu', 'BurgerKing', 2),
('BurgerKing Lunch Menu', 'BurgerKing', 3),
('BurgerKing Breakfast Menu', 'BurgerKing', 1),
('BurgerKing Breakfast Menu', 'BurgerKing', 2),
('BurgerKing Breakfast Menu', 'BurgerKing', 3),
('Crystal Jade Main Menu', 'Crystal Jade', 1),

('Astons Western Menu', 'Astons', 1),
('Astons Western Menu', 'Astons', 2),
('Astons Western Menu', 'Astons', 3),
('Astons Western Menu', 'Astons', 4),

('Sakae Lunch Menu', 'Sakae Sushi', 1),
('Sakae Lunch Menu', 'Sakae Sushi', 2),


('Sushi Express Menu', 'Sushi Express', 1),
('Sushi Express Menu', 'Sushi Express', 2),

('Forlino Menu', 'Forlino', 1),
('Forlino Menu', 'Forlino', 2),

('Exquisite Menu', 'Ristorante Da Valentino', 1),

('Thai Lunch Menu', 'Thai Tantric Authentic Thai Cuisine', 1),
('Thai Lunch Menu', 'Thai Tantric Authentic Thai Cuisine', 2),

('Yumyum Menu', 'NamNam', 1);



insert into confirmedbookings (userName, rname, bid) values
('Aaron', 'MacDonalds', 1),
('Aaron', 'MacDonalds', 2),
('Aaron', 'BurgerKing', 1),
('Aaron', 'Forlino', 1);

/*
SELECT DISTINCT rname FROM confirmedBookings WHERE username = 'Aaron';
*/
--testing
--for one booking, need four entries to Booked Table
/*
insert into BookedTables (rname, bid, tid, pax, bookedTimeslot, bookedDate)
values ('MacDonalds', 1, 1, 1, '10:00:00', '2020-01-01'),
('MacDonalds', 1, 1, 1, '10:15:00', '2020-01-01'),
('MacDonalds', 1, 1, 1, '10:30:00', '2020-01-01'),
('MacDonalds', 1, 1, 1, '10:45:00', '2020-01-01'),
--last entry just to test that deleting a reservationTime 10:00:00 only deletes the first four not the last one
('MacDonalds', 1, 1, 1, '11:00:00', '2020-01-01');
*/
insert into BookedTables (rname, bid, tid, bookedTimeslot, bookedDate)
values ('MacDonalds', 1, 1, '10:00:00', '2020-01-01'),
('MacDonalds', 1, 1, '10:15:00', '2020-01-01'),
('MacDonalds', 1, 1, '10:30:00', '2020-01-01'),
('MacDonalds', 1, 1, '10:45:00', '2020-01-01'),
--last entry just to test that deleting a reservationTime 10:00:00 only deletes the first four not the last one
('MacDonalds', 1, 1, '11:00:00', '2020-01-01');

insert into userpreferences
(userName, preferredRname, preferredLoc,
preferredDate, preferredTime, cuisineType, paxNum)
values ('Aaron', null,null,'2022-03-04','13:00:00',null, 4);

insert into Books (username, rname, bid, tid, pax, reservationtime, reservationdate)
values ('Aaron', 'MacDonalds', 1, 1, 1, '10:00:00', '2020-01-01');


--SELECT DISTINCT rname, bid, tid, pax, reservationTime, reservationDate FROM Books WHERE username = 'Aaron';


--result means it is available for booking (i only need the TID)

--testing

/*
 select * from bookedtables;

delete from bookedtables where rname = 'MacDonalds' and bid= 1 and tid=1 and bookedTimeslot>='10:00:00' and bookedTimeslot < '11:00:00' and  bookedDate ='2020-01-01';
select * from Books where username = 'Aaron';
select * from bookedtables;


SELECT tid
FROM branches B NATURAL JOIN branchTables BT
WHERE B.rname = 'MacDonalds' AND B.bid = 1 AND BT.capacity >= 2
AND B.openTime <= '10:00:00' AND B.closeTime >= '10:00:00'
AND NOT EXISTS (SELECT 1
FROM bookedtables BKT
WHERE BKT.bid = BT.bid AND BT.rname = BKT.rname AND BT.tid = BKT.tid
and BKT.bookeddate = '2020-01-01' and BKT.bookedtimeslot = '10:00:00')
order by BT.capacity
limit 1;
 */

