
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


create table Diners (
accountID integer primary key,
password varchar(20)
);


create table Awards(
accountID integer primary key,
awardPoints integer
);

create table ConfirmedBookings (
accountID integer,
rid integer,
bid integer,
primary key (accountID, rid, bid)
);

create table UserPreferences (
accountID integer,
preferredLoc varchar(40),
preferredDate date,
preferredTime time,
cuisineType varchar(10),
paxNum integer,
budget integer,
primary key (accountID, preferredLoc,preferredDate,preferredTime)
);

create table BranchTables (
rid integer,
bid integer,
tid integer,
pax integer,
primary key (rid, bid, tid)
);


create table freeTables (
rid integer,
bid integer,
tid integer,
pax integer,
--freeTime time,
availableSince time,
primary key (rid, bid, tid, availableSince)
);

create table Books (
rid integer,
bid integer,
tid integer,
pax integer,
freeTime time,
accountID integer,
preferredLoc varchar(40),
preferredDate date,
preferredTime time,
primary key (accountID, preferredLoc,preferredDate,preferredTime, rid, bid, tid,freeTime)
);

create table Ratings (
review varchar(50),
accountID integer references Diners,
rid integer,
bid integer,
foreign key (accountID,rid,bid) references ConfirmedBookings
);

create table Branches (
rid integer,
bid integer,
location varchar(40),
openingHours varchar(20),
openTime time,
closeTime time,
cuisineType varchar(10),
primary key (rid, bid)
);

create table Restaurants (
rid integer primary key,
rname varchar(40)
);

create table Advertises (
rid integer references Restaurants,
bid integer,
primary key (rid,bid),
foreign key (rid,bid) references Branches
);

create table Menu (
name varchar(20) primary key
);

create table menuItems (
menuName varchar(20) references Menu,
foodName varchar(20),
price integer,
primary key (menuName,foodName)
);

create table Sells (
menuName varchar(20) references Menu,
rid integer,
bid integer,
primary key (menuName, rid, bid),
foreign key (rid,bid) references Branches
);