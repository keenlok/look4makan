delete from advertises cascade;
delete from restaurants cascade;
delete from branches cascade;
delete from freetables cascade;
delete from CuisineTypes cascade;
delete from menu cascade;
delete from menuitems cascade;
delete from Sells cascade;

insert into restaurants (rname) values
('MacDonalds'),
('BurgerKing'),
('Crystal Jade');

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
('BurgerKing', 4, 'Centrepoint', '10am - 10pm', '10:00:00', '22:00:00', 'Western', 203193),
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






