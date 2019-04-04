
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

create table Diners (
userName varchar(20) primary key,
firstName varchar(20),
lastName varchar(20),
password varchar(64) NOT NULL,
isAdmin boolean
);

create table Locations (
locName varchar(40) primary key
)


create table Awards(
userName varchar(20) primary key,
awardPoints integer
);

create table CuisineTypes (
cuisineName varchar(10) primary key
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
pax integer,
primary key (rname, bid, tid)
);


create table freeTables (
rname varchar(40),
bid integer,
tid integer,
pax integer,
availableSince time,
primary key (rname, bid, tid, availableSince)
);

create table Books (
rname varchar(40),
bid integer,
tid integer,
pax integer,
freeTime time,
userName varchar(20),
preferredLoc varchar(40) refereneces Location,
preferredDate date,
preferredTime time,
primary key (userName, preferredLoc,preferredDate,preferredTime, rname, bid, tid,freeTime)
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
location varchar(40) references Location,
postalCode integer CHECK (postalCode BETWEEN 010000 AND 809999),
openingHours varchar(20),
openTime time,
closeTime time,
cuisineType varchar(10) references CuisineTypes,
primary key (rname, bid)
);

create table Restaurants (
rname varchar(40) primary key
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
primary key (menuName,foodName)
);

create table Sells (
menuName varchar(50) references Menu,
rname varchar(40),
bid integer,
primary key (menuName, rname, bid),
foreign key (rname,bid) references Branches
);