-----------------------------------------------
--CREATE TABLES
-----------------------------------------------

drop table if exists Diners cascade;
drop table if exists Awards cascade;
drop table if exists ConfirmedBookings  cascade;
drop table if exists UserPreferences  cascade;
drop table if exists BranchTables  cascade;
drop table if exists freeTables  cascade;
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


create table Time (
timeSlot time primary key
);

create table Diners (
userName varchar(20) primary key,
firstName varchar(20),
lastName varchar(20),
password varchar(64) NOT NULL,
isAdmin boolean
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

create table Awards(
userName varchar(20) primary key,
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
preferredLoc varchar(40),
preferredDate date,
preferredTime time,
cuisineType varchar(10) references CuisineTypes,
paxNum integer,
budget integer,
primary key (userName, preferredLoc,preferredDate,preferredTime)
);

create table BranchTables (
rname varchar(40),
bid integer,
tid integer,
capacity integer,
primary key (rname, bid, tid)
);


create table BookedTables (
rname varchar(40),
bid integer,
tid integer,
capacity integer,
bookedTimeslot time,
bookedDate date,
foreign key (rname, bid, tid) references BranchTable,
primary key (rname, bid, tid, bookedTimeslot, bookedDate)
);

create table Books (
rname varchar(40),
bid integer,
tid integer,
pax integer,
reservationTime time,
userName varchar(20),
preferredLoc varchar(40) references Locations,
preferredDate date,
preferredTime time,
foreign key (rname, bid, tid) references BranchTables,
foreign key (userName, preferredLoc,preferredDate,preferredTime) references userpreferences,
primary key (userName, preferredLoc,preferredDate,preferredTime, rname, bid, tid)
);

create table Ratings (
review varchar(50),
userName varchar(20) references Diners,
rname varchar(40),
bid integer,
foreign key (userName,rname,bid) references ConfirmedBookings
);

create table Branches (
rname varchar(40),
bid integer,
location varchar(40) references Locations,
postalCode integer CHECK (postalCode BETWEEN 010000 AND 809999),
openingHours varchar(20),
openTime time,
closeTime time,
cuisineType varchar(10) references CuisineTypes,
primary key (rname, bid)
);

create table Sells (
menuName varchar(50) references Menu,
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


create table Menu (
name varchar(50) primary key
);

create table menuItems (
menuName varchar(50) references Menu,
foodName varchar(50),
price integer,
primary key (menuName,foodName, price)
);


-------------------------------------------------
--INSERT VALUES
-------------------------------------------------

delete from advertises cascade;
delete from restaurants cascade;
delete from Sells cascade;
delete from branches cascade;
delete from freetables cascade;
delete from CuisineTypes cascade;
delete from menuitems cascade;
delete from menu cascade;
delete from Locations cascade;
delete from Time cascade;


insert into Time (timeSlot) values 
('05:00:00'), ('05:15:00'), ('05:30:00'), ('05:45:00'),
('06:00:00'), ('06:15:00'), ('06:30:00'), ('06:45:00'),
('07:00:00'), ('07:15:00'), ('07:30:00'), ('07:45:00'),
('08:00:00'), ('08:15:00'), ('08:30:00'), ('08:45:00'),
('09:00:00'), ('09:15:00'), ('09:30:00'), ('09:45:00'),
('10:00:00'), ('10:15:00'), ('10:30:00'), ('10:45:00'),
('11:00:00'), ('11:15:00'), ('11:30:00'), ('11:45:00'),
('12:00:00'), ('12:15:00'), ('12:30:00'), ('12:45:00'),
('13:00:00'), ('13:15:00'), ('13:30:00'), ('13:45:00'),
('14:00:00'), ('14:15:00'), ('14:30:00'), ('14:45:00'),
('15:00:00'), ('15:15:00'), ('15:30:00'), ('15:45:00'),
('16:00:00'), ('16:15:00'), ('16:30:00'), ('16:45:00'),
('17:00:00'), ('17:15:00'), ('17:30:00'), ('17:45:00'),
('18:00:00'), ('18:15:00'), ('18:30:00'), ('18:45:00'),
('19:00:00'), ('19:15:00'), ('19:30:00'), ('19:45:00'),
('20:00:00'), ('20:15:00'), ('20:30:00'), ('20:45:00'),
('21:00:00'), ('21:15:00'), ('21:30:00'), ('21:45:00'),
('22:00:00'), ('22:15:00'), ('22:30:00'), ('22:45:00'),
('23:00:00'), ('23:15:00'), ('23:30:00'), ('23:45:00');



insert into restaurants (rname) values
('MacDonalds'),
('BurgerKing'),
('Crystal Jade');

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
('Lucky Plaza');




insert into CuisineTypes (cuisineName) values
('Chinese'),
('Western');

insert into branches (rname, bid, location, openinghours, opentime, closetime, cuisinetype, postalCode) values
('MacDonalds', 1, 'Jurong Point', '10am - 10pm', '10:00:00', '22:00:00', 'Western', 648886),
('MacDonalds', 2, 'Clementi Mall', '10am - 10pm', '10:00:00', '22:00:00', 'Western', 129588),
('MacDonalds', 3, 'Vivo City', '8am - 12am', '08:00:00', '23:59:59', 'Western', 342134),
('MacDonalds', 4, 'Plaza Singapura', '9.30am - 10pm', '09:30:00', '22:00:00', 'Western', 495321),
('MacDonalds', 5, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Western', 753132),
('BurgerKing', 1, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Western', 653741),
('BurgerKing', 2, 'Plaza Singapura', '8am - 8pm', '08:00:00', '20:00:00', 'Western', 458351),
('BurgerKing', 3, 'Causeway Point', '7am - 7pm', '07:00:00', '19:00:00', 'Western', 707605),
('BurgerKing', 4, 'Centre Point', '10am - 10pm', '10:00:00', '22:00:00', 'Western', 203193),
('BurgerKing', 5, 'Kent Ridge Mall', '11am - 7pm', '11:00:00', '19:00:00', 'Western', 439013),
('Crystal Jade', 1, 'Vivo City', '10am - 10pm', '10:00:00', '22:00:00', 'Chinese', 403132);


insert into advertises (rname, bid) values
('MacDonalds', 1),
('MacDonalds', 2),
('MacDonalds', 3),
('MacDonalds', 4),
('MacDonalds', 5),
('BurgerKing', 1),
('BurgerKing', 2),
('BurgerKing', 3),
('BurgerKing', 4),
('BurgerKing', 5),
('Crystal Jade', 1);

--need add availableDate attribute values
insert into freetables (rname, bid, tid, pax, availablesince) values
('MacDonalds', 1, 1, 4, '10:00:00'),
('MacDonalds', 1, 2, 4, '10:00:00'),
('MacDonalds', 1, 3, 4, '10:00:00'),
('MacDonalds', 1, 4, 4, '10:00:00'),
('MacDonalds', 1, 5, 4, '10:00:00'),
('MacDonalds', 1, 6, 4, '10:00:00'),
('MacDonalds', 2, 1, 4, '10:00:00'),
('MacDonalds', 2, 2, 4, '10:00:00'),
('MacDonalds', 2, 3, 4, '10:00:00'),
('MacDonalds', 2, 4, 4, '10:00:00'),
('MacDonalds', 2, 5, 4, '10:00:00'),
('MacDonalds', 2, 6, 4, '10:00:00'),
('BurgerKing', 1, 1, 4, '10:00:00'),
('BurgerKing', 1, 2, 4, '10:00:00'),
('BurgerKing', 1, 3, 4, '10:00:00'),
('BurgerKing', 1, 4, 4, '10:00:00'),
('BurgerKing', 1, 5, 4, '10:00:00'),
('BurgerKing', 1, 6, 4, '10:00:00'),
('BurgerKing', 3, 1, 4, '10:00:00'),
('Crystal Jade', 1, 1, 25, '10:00:00')
;

insert into menu (name) values
('MacDonalds Breakfast Menu'),
('MacDonalds Lunch Menu'),
('BurgerKing Breakfast Menu'),
('BurgerKing Lunch Menu'),
('Crystal Jade Main Menu'),
('Crystal Jade Promotion Menu')
;

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
('Crystal Jade Main Menu', 'Wasabi Prawn Roll', 5)
;

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
('BurgerKing Lunch Menu', 'BurgerKing', 4),
('BurgerKing Lunch Menu', 'BurgerKing', 5),
('BurgerKing Breakfast Menu', 'BurgerKing', 1),
('BurgerKing Breakfast Menu', 'BurgerKing', 2),
('BurgerKing Breakfast Menu', 'BurgerKing', 3),
('BurgerKing Breakfast Menu', 'BurgerKing', 4),
('BurgerKing Breakfast Menu', 'BurgerKing', 5),
('Crystal Jade Main Menu', 'Crystal Jade', 1)
;




