delete from Time cascade;
delete from awards cascade;
delete from diners cascade;
delete from advertises cascade;
delete from restaurants cascade;
delete from Sells cascade;
delete from bookedtables cascade;
delete from branchtables cascade;
delete from branches cascade;
delete from CuisineTypes cascade;
delete from menuitems cascade;
delete from menu cascade;
delete from Locations cascade;

INSERT INTO Time (timeSlot, timeSlotStr)  VALUES
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
('18:00:00', '6:00 pm'), ('18:15:00', '6:15 pm'), ('18:30:00', '6:30 pm'), ('18:45:00', '6:45 pm'),
('19:00:00', '7:00 pm'), ('19:15:00', '7:15 pm'), ('19:30:00', '7:30 pm'), ('19:45:00', '7:45 pm'),
('20:00:00', '8:00 pm'), ('20:15:00', '8:15 pm'), ('20:30:00', '8:30 pm'), ('20:45:00', '8:45 pm'),
('21:00:00', '9:00 pm'), ('21:15:00', '9:15 pm'), ('21:30:00', '9:30 pm'), ('21:45:00', '9:45 pm'),
('22:00:00', '10:00 pm'), ('22:15:00', '10:15 pm'), ('22:30:00', '10:30 pm'), ('22:45:00', '10:45 pm'),
('23:00:00', '11:00 pm'), ('23:15:00', '11:15 pm'), ('23:30:00', '11:30 pm'), ('23:45:00', '11:45 pm');


INSERT INTO diners (username, firstname, lastname, password, isAdmin) VALUES
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


INSERT INTO locations (locname) VALUES
('Jurong Point'), ('Centre Point'), ('Causeway Point'), ('Vivo City'), ('Clementi Mall'),
('Plaza Singapura'), ('Orchard Scape'), ('Kent Ridge Mall'),('100am Mall'),
('Orchard Central'),('Shaw Plaza'),('Lucky Plaza'),('Buona Vista'),
('Cagliari'),('Villarrica'),('Acquasanta Terme'),('San Leucio del Sannio'),
('Hofstade'),('Heerenveen'),('As'),('Kanpur Cantonment'),('Narbolia'),
('Marano Lagunare'),('Adana'),('Spoleto'),('Bear'),('Tiel'),('Bionaz'),
('Cap-Rouge'),('Great Falls'),('Cowdenbeath'),('Castellina in Chianti'),
('Annapolis'),('Orta San Giulio'),('Burnpur'),('Kulti-Barakar'),('Llangefni'),
('Mangalore'),('Saint-Maur-des-Fossés'),('Tewkesbury'),('Drayton Valley'),
('Bad Nauheim'),('Bahawalnagar'),('Helena'),('Kozhikode'),('Huntley'),('San Pedro de la Paz'),
('Annapolis County'),('Linkhout'),('Gary'),('Daly'),('Oxford County'),('Langenhagen'),
('Luino'),('Halkirk'),('Beausejour'),('Warwick');

INSERT INTO restaurants (rname) VALUES
('MacDonalds'), ('BurgerKing'), ('Crystal Jade'), ('Astons'), ('Sushi Express'), ('Forlino'),
('Ristorante Da Valentino'), ('Thai Tantric Authentic Thai Cuisine'), ('NamNam'),
('Vivamus Euismod Urna Ltd'),('Curabitur Sed Foundation'),('Tellus Sem Ltd'),
('Nec Ligula Inc.'),('Euismod Urna PC'),('Bibendum Sed Incorporated'),('Pellentesque Industries'),
('Eget Massa Suspendisse Incorporated'),('Semper Cursus Integer Corporation'),('Leo In Lobortis LLC'),
('Odio Institute'),('Eget Industries'),('Sollicitudin Corp.'),('Vitae Diam Foundation'),
('Sed Pharetra Felis Associates'),('Dui Quis PC'),('Sed Dictum Corp.'),('Lorem Foundation'),
('Interdum Incorporated'),('Sociis LLP'),('Lorem Semper Corporation'),('A Corporation'),
('Enim Consulting'),('Enim Mi LLP'),('A Neque Associates'),('Elit A LLP'),('Est Mauris Eu Institute'),
('Pharetra Consulting'),('Eu Tellus Phasellus Company'),('Lacus Mauris Limited'),('Amet Risus Donec Limited'),
('Mauris Institute'),('Fringilla PC'),('Fames Ac Turpis PC'),('Odio Etiam Limited'),('Egestas Ltd'),
('Ligula Aenean LLP'),('Magna Foundation'),('Velit Sed PC'),('Turpis Non Ltd'),('Tempor Consulting'),
('A Magna Lorem PC'),('Nulla Cras Inc.'),('Magna Suspendisse Tristique Consulting'),('Nibh Sit Amet PC'),
('Dolor LLP'),('Sed Sem Corp.'),('Nec Luctus Associates'),('Nec Urna Suscipit Limited'),('Nam Nulla Magna LLP'),
('Sed LLC'),('Sed Consulting'),('Congue LLC');

INSERT INTO CuisineTypes (cuisineName) VALUES
('Chinese'), ('Western'), ('Japanese'), ('Korean'),('Italian'), ('Oriental'),
('French'), ('Indian'), ('Straits'), ('Malay'), ('Thai'), ('Vietnamese');

INSERT INTO branches (rname, bid, location, openinghours, opentime, closetime, cuisinetype) VALUES
('MacDonalds', 1, 'Jurong Point', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('MacDonalds', 2, 'Clementi Mall', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('MacDonalds', 3, 'Vivo City', '8am - 12am', '08:00:00', '23:59:59', 'Western'),
('MacDonalds', 4, 'Plaza Singapura', '9.30am - 10pm', '09:30:00', '22:00:00', 'Western'),
('MacDonalds', 5, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('BurgerKing', 1, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('BurgerKing', 2, 'Plaza Singapura', '8am - 8pm', '08:00:00', '20:00:00', 'Western'),
('BurgerKing', 3, 'Causeway Point', '7am - 7pm', '07:00:00', '19:00:00', 'Western'),
('Crystal Jade', 1, 'Vivo City', '10am - 10pm', '10:00:00', '22:00:00', 'Chinese'),
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
('NamNam', 1, 'Orchard Scape', '10am - 10pm', '10:00:00', '22:00:00', 'Vietnamese'),
('Vivamus Euismod Urna Ltd', 1, 'Cagliari', '10am - 10pm', '10:00:00', '22:00:00', 'Italian'),
('Vivamus Euismod Urna Ltd', 2, 'Villarrica', '10am - 10pm', '10:00:00', '22:00:00', 'Italian'),
('Vivamus Euismod Urna Ltd', 3, 'Acquasanta Terme', '10am - 10pm', '10:00:00', '22:00:00', 'Italian'),
('Vivamus Euismod Urna Ltd', 4, 'Halkirk', '10am - 10pm', '10:00:00', '22:00:00', 'Italian'),
('Vivamus Euismod Urna Ltd', 5, 'Beausejour', '10am - 10pm', '10:00:00', '22:00:00', 'Italian'),
('Vivamus Euismod Urna Ltd', 6, 'Warwick', '10am - 10pm', '10:00:00', '22:00:00', 'Italian'),
('Vivamus Euismod Urna Ltd', 7, 'Luino', '10am - 10pm', '10:00:00', '22:00:00', 'Italian'),
('Vivamus Euismod Urna Ltd', 8, 'Gary', '10am - 10pm', '10:00:00', '22:00:00', 'Italian'),
('Vivamus Euismod Urna Ltd', 9, 'Bahawalnagar', '10am - 10pm', '10:00:00', '22:00:00', 'Italian'),
('Vivamus Euismod Urna Ltd', 10, 'Helena', '10am - 10pm', '10:00:00', '22:00:00', 'Italian'),
('Curabitur Sed Foundation', 1, 'Cagliari', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Curabitur Sed Foundation', 2, 'Villarrica', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Curabitur Sed Foundation', 3, 'Acquasanta Terme', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Curabitur Sed Foundation', 4, 'Halkirk', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Curabitur Sed Foundation', 5, 'Beausejour', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Curabitur Sed Foundation', 6, 'Warwick', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Curabitur Sed Foundation', 7, 'Luino', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Curabitur Sed Foundation', 8, 'Gary', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Curabitur Sed Foundation', 9, 'Bahawalnagar', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Curabitur Sed Foundation', 10, 'Helena', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('A Corporation', 1, 'Cagliari', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('A Corporation', 2, 'Villarrica', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('A Corporation', 3, 'Acquasanta Terme', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('A Corporation', 4, 'Halkirk', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('A Corporation', 5, 'Beausejour', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('A Corporation', 6, 'Warwick', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('A Corporation', 7, 'Luino', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('A Corporation', 8, 'Gary', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('A Corporation', 9, 'Bahawalnagar', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('A Corporation', 10, 'Helena', '10am - 10pm', '10:00:00', '22:00:00', 'Western'),
('Tellus Sem Ltd', 1, 'Cagliari', '10am - 10pm', '10:00:00', '22:00:00', 'Oriental'),
('Tellus Sem Ltd', 2, 'Villarrica', '10am - 10pm', '10:00:00', '22:00:00', 'Oriental'),
('Tellus Sem Ltd', 3, 'Acquasanta Terme', '10am - 10pm', '10:00:00', '22:00:00', 'Oriental'),
('Tellus Sem Ltd', 4, 'Halkirk', '10am - 10pm', '10:00:00', '22:00:00', 'Oriental'),
('Tellus Sem Ltd', 5, 'Beausejour', '10am - 10pm', '10:00:00', '22:00:00', 'Oriental'),
('Tellus Sem Ltd', 6, 'Warwick', '10am - 10pm', '10:00:00', '22:00:00', 'Oriental'),
('Tellus Sem Ltd', 7, 'Luino', '10am - 10pm', '10:00:00', '22:00:00', 'Oriental'),
('Tellus Sem Ltd', 8, 'Gary', '10am - 10pm', '10:00:00', '22:00:00', 'Oriental'),
('Tellus Sem Ltd', 9, 'Bahawalnagar', '10am - 10pm', '10:00:00', '22:00:00', 'Oriental'),
('Tellus Sem Ltd', 10, 'Helena', '10am - 10pm', '10:00:00', '22:00:00', 'Oriental');

INSERT INTO advertises (rname, bid) VALUES
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
('NamNam', 1),
('Vivamus Euismod Urna Ltd', 1),
('Vivamus Euismod Urna Ltd', 2),
('Vivamus Euismod Urna Ltd', 3),
('Vivamus Euismod Urna Ltd', 4),
('Vivamus Euismod Urna Ltd', 5),
('Vivamus Euismod Urna Ltd', 6),
('Vivamus Euismod Urna Ltd', 7),
('Vivamus Euismod Urna Ltd', 8),
('Vivamus Euismod Urna Ltd', 9),
('Vivamus Euismod Urna Ltd',10),
('Curabitur Sed Foundation', 1),
('Curabitur Sed Foundation', 2),
('Curabitur Sed Foundation', 3),
('Curabitur Sed Foundation', 4),
('Curabitur Sed Foundation', 5),
('Curabitur Sed Foundation', 6),
('Curabitur Sed Foundation', 7),
('Curabitur Sed Foundation', 8),
('Curabitur Sed Foundation', 9),
('Curabitur Sed Foundation', 10),
('A Corporation', 1),
('A Corporation', 2),
('A Corporation', 3),
('A Corporation', 4),
('A Corporation', 5),
('A Corporation', 6),
('A Corporation', 7),
('A Corporation', 8),
('A Corporation', 9),
('A Corporation', 10),
('Tellus Sem Ltd', 1),
('Tellus Sem Ltd', 2),
('Tellus Sem Ltd', 3),
('Tellus Sem Ltd', 4),
('Tellus Sem Ltd', 5),
('Tellus Sem Ltd', 6),
('Tellus Sem Ltd', 7),
('Tellus Sem Ltd', 8),
('Tellus Sem Ltd', 9),
('Tellus Sem Ltd', 10);

INSERT INTO branchtables (rname, bid, tid, capacity) VALUES
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
('NamNam', 1, 1, 3),
('Vivamus Euismod Urna Ltd', 1, 1, 4),
('Vivamus Euismod Urna Ltd', 1, 2, 4),
('Vivamus Euismod Urna Ltd', 1, 3, 4),
('Vivamus Euismod Urna Ltd', 1, 4, 4),
('Vivamus Euismod Urna Ltd', 1, 5, 4),
('Vivamus Euismod Urna Ltd', 1, 6, 4),
('Vivamus Euismod Urna Ltd', 1, 7, 4),
('Vivamus Euismod Urna Ltd', 1, 8, 4),
('Vivamus Euismod Urna Ltd', 1, 9, 8),
('Vivamus Euismod Urna Ltd', 1, 10, 8),
('Vivamus Euismod Urna Ltd', 2, 1, 4),
('Vivamus Euismod Urna Ltd', 2, 2, 4),
('Vivamus Euismod Urna Ltd', 2, 3, 4),
('Vivamus Euismod Urna Ltd', 2, 4, 4),
('Vivamus Euismod Urna Ltd', 2, 5, 4),
('Vivamus Euismod Urna Ltd', 2, 6, 4),
('Vivamus Euismod Urna Ltd', 2, 7, 8),
('Vivamus Euismod Urna Ltd', 2, 8, 8),
('Vivamus Euismod Urna Ltd', 2, 9, 8),
('Vivamus Euismod Urna Ltd', 2, 10, 8),
('Vivamus Euismod Urna Ltd', 3, 1, 4),
('Vivamus Euismod Urna Ltd', 3, 2, 4),
('Vivamus Euismod Urna Ltd', 3, 3, 4),
('Vivamus Euismod Urna Ltd', 3, 4, 4),
('Vivamus Euismod Urna Ltd', 3, 5, 4),
('Vivamus Euismod Urna Ltd', 3, 6, 4),
('Vivamus Euismod Urna Ltd', 3, 7, 8),
('Vivamus Euismod Urna Ltd', 3, 8, 8),
('Vivamus Euismod Urna Ltd', 3, 9, 8),
('Vivamus Euismod Urna Ltd', 3, 10, 8),
('Vivamus Euismod Urna Ltd', 4, 1, 4),
('Vivamus Euismod Urna Ltd', 4, 2, 4),
('Vivamus Euismod Urna Ltd', 4, 3, 4),
('Vivamus Euismod Urna Ltd', 4, 4, 4),
('Vivamus Euismod Urna Ltd', 4, 5, 4),
('Vivamus Euismod Urna Ltd', 4, 6, 4),
('Vivamus Euismod Urna Ltd', 4, 7, 8),
('Vivamus Euismod Urna Ltd', 4, 8, 8),
('Vivamus Euismod Urna Ltd', 4, 9, 8),
('Vivamus Euismod Urna Ltd', 4, 10, 8),
('Vivamus Euismod Urna Ltd', 5, 1, 4),
('Vivamus Euismod Urna Ltd', 5, 2, 4),
('Vivamus Euismod Urna Ltd', 5, 3, 4),
('Vivamus Euismod Urna Ltd', 5, 4, 4),
('Vivamus Euismod Urna Ltd', 5, 5, 4),
('Vivamus Euismod Urna Ltd', 5, 6, 4),
('Vivamus Euismod Urna Ltd', 5, 7, 8),
('Vivamus Euismod Urna Ltd', 5, 8, 8),
('Vivamus Euismod Urna Ltd', 5, 9, 8),
('Vivamus Euismod Urna Ltd', 5, 10, 8),
('Vivamus Euismod Urna Ltd', 6, 1, 4),
('Vivamus Euismod Urna Ltd', 6, 2, 4),
('Vivamus Euismod Urna Ltd', 6, 3, 4),
('Vivamus Euismod Urna Ltd', 6, 4, 4),
('Vivamus Euismod Urna Ltd', 6, 5, 4),
('Vivamus Euismod Urna Ltd', 6, 6, 4),
('Vivamus Euismod Urna Ltd', 6, 7, 8),
('Vivamus Euismod Urna Ltd', 6, 8, 8),
('Vivamus Euismod Urna Ltd', 6, 9, 8),
('Vivamus Euismod Urna Ltd', 6, 10, 8),
('Vivamus Euismod Urna Ltd', 7, 1, 4),
('Vivamus Euismod Urna Ltd', 7, 2, 4),
('Vivamus Euismod Urna Ltd', 7, 3, 4),
('Vivamus Euismod Urna Ltd', 7, 4, 4),
('Vivamus Euismod Urna Ltd', 7, 5, 4),
('Vivamus Euismod Urna Ltd', 7, 6, 4),
('Vivamus Euismod Urna Ltd', 7, 7, 8),
('Vivamus Euismod Urna Ltd', 7, 8, 8),
('Vivamus Euismod Urna Ltd', 7, 9, 8),
('Vivamus Euismod Urna Ltd', 7, 10, 8),
('Vivamus Euismod Urna Ltd', 8, 1, 4),
('Vivamus Euismod Urna Ltd', 8, 2, 4),
('Vivamus Euismod Urna Ltd', 8, 3, 4),
('Vivamus Euismod Urna Ltd', 8, 4, 4),
('Vivamus Euismod Urna Ltd', 8, 5, 4),
('Vivamus Euismod Urna Ltd', 8, 6, 4),
('Vivamus Euismod Urna Ltd', 8, 7, 8),
('Vivamus Euismod Urna Ltd', 8, 8, 8),
('Vivamus Euismod Urna Ltd', 8, 9, 8),
('Vivamus Euismod Urna Ltd', 8, 10, 8),
('Vivamus Euismod Urna Ltd', 9, 1, 4),
('Vivamus Euismod Urna Ltd', 9, 2, 4),
('Vivamus Euismod Urna Ltd', 9, 3, 4),
('Vivamus Euismod Urna Ltd', 9, 4, 4),
('Vivamus Euismod Urna Ltd', 9, 5, 4),
('Vivamus Euismod Urna Ltd', 9, 6, 4),
('Vivamus Euismod Urna Ltd', 9, 7, 8),
('Vivamus Euismod Urna Ltd', 9, 8, 8),
('Vivamus Euismod Urna Ltd', 9, 9, 8),
('Vivamus Euismod Urna Ltd', 9, 10, 8),
('Vivamus Euismod Urna Ltd', 10, 1, 4),
('Vivamus Euismod Urna Ltd', 10, 2, 4),
('Vivamus Euismod Urna Ltd', 10, 3, 4),
('Vivamus Euismod Urna Ltd', 10, 4, 4),
('Vivamus Euismod Urna Ltd', 10, 5, 4),
('Vivamus Euismod Urna Ltd', 10, 6, 4),
('Vivamus Euismod Urna Ltd', 10, 7, 8),
('Vivamus Euismod Urna Ltd', 10, 8, 8),
('Vivamus Euismod Urna Ltd', 10, 9, 8),
('Vivamus Euismod Urna Ltd', 10, 10, 8),
('Curabitur Sed Foundation', 1, 1, 4),
('Curabitur Sed Foundation', 1, 2, 4),
('Curabitur Sed Foundation', 1, 3, 4),
('Curabitur Sed Foundation', 1, 4, 4),
('Curabitur Sed Foundation', 1, 5, 4),
('Curabitur Sed Foundation', 1, 6, 4),
('Curabitur Sed Foundation', 1, 7, 8),
('Curabitur Sed Foundation', 1, 8, 8),
('Curabitur Sed Foundation', 1, 9, 8),
('Curabitur Sed Foundation', 1, 10, 8),
('Curabitur Sed Foundation', 2, 1, 4),
('Curabitur Sed Foundation', 2, 2, 4),
('Curabitur Sed Foundation', 2, 3, 4),
('Curabitur Sed Foundation', 2, 4, 4),
('Curabitur Sed Foundation', 2, 5, 4),
('Curabitur Sed Foundation', 2, 6, 4),
('Curabitur Sed Foundation', 2, 7, 8),
('Curabitur Sed Foundation', 2, 8, 8),
('Curabitur Sed Foundation', 2, 9, 8),
('Curabitur Sed Foundation', 2, 10, 8),
('Curabitur Sed Foundation', 3, 1, 4),
('Curabitur Sed Foundation', 3, 2, 4),
('Curabitur Sed Foundation', 3, 3, 4),
('Curabitur Sed Foundation', 3, 4, 4),
('Curabitur Sed Foundation', 3, 5, 4),
('Curabitur Sed Foundation', 3, 6, 4),
('Curabitur Sed Foundation', 3, 7, 8),
('Curabitur Sed Foundation', 3, 8, 8),
('Curabitur Sed Foundation', 3, 9, 8),
('Curabitur Sed Foundation', 3, 10, 8),
('Curabitur Sed Foundation', 4, 1, 4),
('Curabitur Sed Foundation', 4, 2, 4),
('Curabitur Sed Foundation', 4, 3, 4),
('Curabitur Sed Foundation', 4, 4, 4),
('Curabitur Sed Foundation', 4, 5, 4),
('Curabitur Sed Foundation', 4, 6, 4),
('Curabitur Sed Foundation', 4, 7, 8),
('Curabitur Sed Foundation', 4, 8, 8),
('Curabitur Sed Foundation', 4, 9, 8),
('Curabitur Sed Foundation', 4, 10, 8),
('Curabitur Sed Foundation', 5, 1, 4),
('Curabitur Sed Foundation', 5, 2, 4),
('Curabitur Sed Foundation', 5, 3, 4),
('Curabitur Sed Foundation', 5, 4, 4),
('Curabitur Sed Foundation', 5, 5, 4),
('Curabitur Sed Foundation', 5, 6, 4),
('Curabitur Sed Foundation', 5, 7, 8),
('Curabitur Sed Foundation', 5, 8, 8),
('Curabitur Sed Foundation', 5, 9, 8),
('Curabitur Sed Foundation', 5, 10, 8),
('Curabitur Sed Foundation', 6, 1, 4),
('Curabitur Sed Foundation', 6, 2, 4),
('Curabitur Sed Foundation', 6, 3, 4),
('Curabitur Sed Foundation', 6, 4, 4),
('Curabitur Sed Foundation', 6, 5, 4),
('Curabitur Sed Foundation', 6, 6, 4),
('Curabitur Sed Foundation', 6, 7, 8),
('Curabitur Sed Foundation', 6, 8, 8),
('Curabitur Sed Foundation', 6, 9, 8),
('Curabitur Sed Foundation', 6, 10, 8),
('Curabitur Sed Foundation', 7, 1, 4),
('Curabitur Sed Foundation', 7, 2, 4),
('Curabitur Sed Foundation', 7, 3, 4),
('Curabitur Sed Foundation', 7, 4, 4),
('Curabitur Sed Foundation', 7, 5, 4),
('Curabitur Sed Foundation', 7, 6, 4),
('Curabitur Sed Foundation', 7, 7, 8),
('Curabitur Sed Foundation', 7, 8, 8),
('Curabitur Sed Foundation', 7, 9, 8),
('Curabitur Sed Foundation', 7, 10, 8),
('Curabitur Sed Foundation', 8, 1, 4),
('Curabitur Sed Foundation', 8, 2, 4),
('Curabitur Sed Foundation', 8, 3, 4),
('Curabitur Sed Foundation', 8, 4, 4),
('Curabitur Sed Foundation', 8, 5, 4),
('Curabitur Sed Foundation', 8, 6, 4),
('Curabitur Sed Foundation', 8, 7, 8),
('Curabitur Sed Foundation', 8, 8, 8),
('Curabitur Sed Foundation', 8, 9, 8),
('Curabitur Sed Foundation', 8, 10, 8),
('Curabitur Sed Foundation', 9, 1, 4),
('Curabitur Sed Foundation', 9, 2, 4),
('Curabitur Sed Foundation', 9, 3, 4),
('Curabitur Sed Foundation', 9, 4, 4),
('Curabitur Sed Foundation', 9, 5, 4),
('Curabitur Sed Foundation', 9, 6, 4),
('Curabitur Sed Foundation', 9, 7, 8),
('Curabitur Sed Foundation', 9, 8, 8),
('Curabitur Sed Foundation', 9, 9, 8),
('Curabitur Sed Foundation', 9, 10, 8),
('Curabitur Sed Foundation', 10, 1, 4),
('Curabitur Sed Foundation', 10, 2, 4),
('Curabitur Sed Foundation', 10, 3, 4),
('Curabitur Sed Foundation', 10, 4, 4),
('Curabitur Sed Foundation', 10, 5, 4),
('Curabitur Sed Foundation', 10, 6, 4),
('Curabitur Sed Foundation', 10, 7, 8),
('Curabitur Sed Foundation', 10, 8, 8),
('Curabitur Sed Foundation', 10, 9, 8),
('Curabitur Sed Foundation', 10, 10, 8),
('A Corporation', 1, 1, 4),
('A Corporation', 1, 2, 4),
('A Corporation', 1, 3, 4),
('A Corporation', 1, 4, 4),
('A Corporation', 1, 5, 4),
('A Corporation', 1, 6, 4),
('A Corporation', 1, 7, 8),
('A Corporation', 1, 8, 8),
('A Corporation', 1, 9, 8),
('A Corporation', 1, 10, 8),
('A Corporation', 2, 1, 4),
('A Corporation', 2, 2, 4),
('A Corporation', 2, 3, 4),
('A Corporation', 2, 4, 4),
('A Corporation', 2, 5, 4),
('A Corporation', 2, 6, 4),
('A Corporation', 2, 7, 8),
('A Corporation', 2, 8, 8),
('A Corporation', 2, 9, 8),
('A Corporation', 2, 10, 8),
('A Corporation', 3, 1, 4),
('A Corporation', 3, 2, 4),
('A Corporation', 3, 3, 4),
('A Corporation', 3, 4, 4),
('A Corporation', 3, 5, 4),
('A Corporation', 3, 6, 4),
('A Corporation', 3, 7, 8),
('A Corporation', 3, 8, 8),
('A Corporation', 3, 9, 8),
('A Corporation', 3, 10, 8),
('A Corporation', 4, 1, 4),
('A Corporation', 4, 2, 4),
('A Corporation', 4, 3, 4),
('A Corporation', 4, 4, 4),
('A Corporation', 4, 5, 4),
('A Corporation', 4, 6, 4),
('A Corporation', 4, 7, 8),
('A Corporation', 4, 8, 8),
('A Corporation', 4, 9, 8),
('A Corporation', 4, 10, 8),
('A Corporation', 5, 1, 4),
('A Corporation', 5, 2, 4),
('A Corporation', 5, 3, 4),
('A Corporation', 5, 4, 4),
('A Corporation', 5, 5, 4),
('A Corporation', 5, 6, 4),
('A Corporation', 5, 7, 8),
('A Corporation', 5, 8, 8),
('A Corporation', 5, 9, 8),
('A Corporation', 5, 10, 8),
('A Corporation', 6, 1, 4),
('A Corporation', 6, 2, 4),
('A Corporation', 6, 3, 4),
('A Corporation', 6, 4, 4),
('A Corporation', 6, 5, 4),
('A Corporation', 6, 6, 4),
('A Corporation', 6, 7, 8),
('A Corporation', 6, 8, 8),
('A Corporation', 6, 9, 8),
('A Corporation', 6, 10, 8),
('A Corporation', 7, 1, 4),
('A Corporation', 7, 2, 4),
('A Corporation', 7, 3, 4),
('A Corporation', 7, 4, 4),
('A Corporation', 7, 5, 4),
('A Corporation', 7, 6, 4),
('A Corporation', 7, 7, 8),
('A Corporation', 7, 8, 8),
('A Corporation', 7, 9, 8),
('A Corporation', 7, 10, 8),
('A Corporation', 8, 1, 4),
('A Corporation', 8, 2, 4),
('A Corporation', 8, 3, 4),
('A Corporation', 8, 4, 4),
('A Corporation', 8, 5, 4),
('A Corporation', 8, 6, 4),
('A Corporation', 8, 7, 8),
('A Corporation', 8, 8, 8),
('A Corporation', 8, 9, 8),
('A Corporation', 8, 10, 8),
('A Corporation', 9, 1, 4),
('A Corporation', 9, 2, 4),
('A Corporation', 9, 3, 4),
('A Corporation', 9, 4, 4),
('A Corporation', 9, 5, 4),
('A Corporation', 9, 6, 4),
('A Corporation', 9, 7, 8),
('A Corporation', 9, 8, 8),
('A Corporation', 9, 9, 8),
('A Corporation', 9, 10, 8),
('A Corporation', 10, 1, 4),
('A Corporation', 10, 2, 4),
('A Corporation', 10, 3, 4),
('A Corporation', 10, 4, 4),
('A Corporation', 10, 5, 4),
('A Corporation', 10, 6, 4),
('A Corporation', 10, 7, 8),
('A Corporation', 10, 8, 8),
('A Corporation', 10, 9, 8),
('A Corporation', 10, 10, 8),
('Tellus Sem Ltd', 1, 1, 4),
('Tellus Sem Ltd', 1, 2, 4),
('Tellus Sem Ltd', 1, 3, 4),
('Tellus Sem Ltd', 1, 4, 4),
('Tellus Sem Ltd', 1, 5, 4),
('Tellus Sem Ltd', 1, 6, 4),
('Tellus Sem Ltd', 1, 7, 8),
('Tellus Sem Ltd', 1, 8, 8),
('Tellus Sem Ltd', 1, 9, 8),
('Tellus Sem Ltd', 1, 10, 8),
('Tellus Sem Ltd', 2, 1, 4),
('Tellus Sem Ltd', 2, 2, 4),
('Tellus Sem Ltd', 2, 3, 4),
('Tellus Sem Ltd', 2, 4, 4),
('Tellus Sem Ltd', 2, 5, 4),
('Tellus Sem Ltd', 2, 6, 4),
('Tellus Sem Ltd', 2, 7, 8),
('Tellus Sem Ltd', 2, 8, 8),
('Tellus Sem Ltd', 2, 9, 8),
('Tellus Sem Ltd', 2, 10, 8),
('Tellus Sem Ltd', 3, 1, 4),
('Tellus Sem Ltd', 3, 2, 4),
('Tellus Sem Ltd', 3, 3, 4),
('Tellus Sem Ltd', 3, 4, 4),
('Tellus Sem Ltd', 3, 5, 4),
('Tellus Sem Ltd', 3, 6, 4),
('Tellus Sem Ltd', 3, 7, 8),
('Tellus Sem Ltd', 3, 8, 8),
('Tellus Sem Ltd', 3, 9, 8),
('Tellus Sem Ltd', 3, 10, 8),
('Tellus Sem Ltd', 4, 1, 4),
('Tellus Sem Ltd', 4, 2, 4),
('Tellus Sem Ltd', 4, 3, 4),
('Tellus Sem Ltd', 4, 4, 4),
('Tellus Sem Ltd', 4, 5, 4),
('Tellus Sem Ltd', 4, 6, 4),
('Tellus Sem Ltd', 4, 7, 8),
('Tellus Sem Ltd', 4, 8, 8),
('Tellus Sem Ltd', 4, 9, 8),
('Tellus Sem Ltd', 4, 10, 8),
('Tellus Sem Ltd', 5, 1, 4),
('Tellus Sem Ltd', 5, 2, 4),
('Tellus Sem Ltd', 5, 3, 4),
('Tellus Sem Ltd', 5, 4, 4),
('Tellus Sem Ltd', 5, 5, 4),
('Tellus Sem Ltd', 5, 6, 4),
('Tellus Sem Ltd', 5, 7, 8),
('Tellus Sem Ltd', 5, 8, 8),
('Tellus Sem Ltd', 5, 9, 8),
('Tellus Sem Ltd', 5, 10, 8),
('Tellus Sem Ltd', 6, 1, 4),
('Tellus Sem Ltd', 6, 2, 4),
('Tellus Sem Ltd', 6, 3, 4),
('Tellus Sem Ltd', 6, 4, 4),
('Tellus Sem Ltd', 6, 5, 4),
('Tellus Sem Ltd', 6, 6, 4),
('Tellus Sem Ltd', 6, 7, 8),
('Tellus Sem Ltd', 6, 8, 8),
('Tellus Sem Ltd', 6, 9, 8),
('Tellus Sem Ltd', 6, 10, 8),
('Tellus Sem Ltd', 7, 1, 4),
('Tellus Sem Ltd', 7, 2, 4),
('Tellus Sem Ltd', 7, 3, 4),
('Tellus Sem Ltd', 7, 4, 4),
('Tellus Sem Ltd', 7, 5, 4),
('Tellus Sem Ltd', 7, 6, 4),
('Tellus Sem Ltd', 7, 7, 8),
('Tellus Sem Ltd', 7, 8, 8),
('Tellus Sem Ltd', 7, 9, 8),
('Tellus Sem Ltd', 7, 10, 8),
('Tellus Sem Ltd', 8, 1, 4),
('Tellus Sem Ltd', 8, 2, 4),
('Tellus Sem Ltd', 8, 3, 4),
('Tellus Sem Ltd', 8, 4, 4),
('Tellus Sem Ltd', 8, 5, 4),
('Tellus Sem Ltd', 8, 6, 4),
('Tellus Sem Ltd', 8, 7, 8),
('Tellus Sem Ltd', 8, 8, 8),
('Tellus Sem Ltd', 8, 9, 8),
('Tellus Sem Ltd', 8, 10, 8),
('Tellus Sem Ltd', 9, 1, 4),
('Tellus Sem Ltd', 9, 2, 4),
('Tellus Sem Ltd', 9, 3, 4),
('Tellus Sem Ltd', 9, 4, 4),
('Tellus Sem Ltd', 9, 5, 4),
('Tellus Sem Ltd', 9, 6, 4),
('Tellus Sem Ltd', 9, 7, 8),
('Tellus Sem Ltd', 9, 8, 8),
('Tellus Sem Ltd', 9, 9, 8),
('Tellus Sem Ltd', 9, 10, 8),
('Tellus Sem Ltd', 10, 1, 4),
('Tellus Sem Ltd', 10, 2, 4),
('Tellus Sem Ltd', 10, 3, 4),
('Tellus Sem Ltd', 10, 4, 4),
('Tellus Sem Ltd', 10, 5, 4),
('Tellus Sem Ltd', 10, 6, 4),
('Tellus Sem Ltd', 10, 7, 8),
('Tellus Sem Ltd', 10, 8, 8),
('Tellus Sem Ltd', 10, 9, 8),
('Tellus Sem Ltd', 10, 10, 8);

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
('Yumyum Menu'),
('Vivamus Menu'),
('Curabiturian Menu'),
('A Star Menu'),
('Tellus Sem Menu');

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
('Yumyum Menu', 'NamNam', 1),
('Vivamus Menu','Vivamus Euismod Urna Ltd', 1),
('Vivamus Menu','Vivamus Euismod Urna Ltd', 2),
('Vivamus Menu','Vivamus Euismod Urna Ltd', 3),
('Vivamus Menu','Vivamus Euismod Urna Ltd', 4),
('Vivamus Menu','Vivamus Euismod Urna Ltd', 5),
('Vivamus Menu','Vivamus Euismod Urna Ltd', 6),
('Vivamus Menu','Vivamus Euismod Urna Ltd', 7),
('Vivamus Menu','Vivamus Euismod Urna Ltd', 8),
('Vivamus Menu','Vivamus Euismod Urna Ltd', 9),
('Vivamus Menu','Vivamus Euismod Urna Ltd', 10),
('Curabiturian Menu','Curabitur Sed Foundation', 1),
('Curabiturian Menu','Curabitur Sed Foundation', 2),
('Curabiturian Menu','Curabitur Sed Foundation', 3),
('Curabiturian Menu','Curabitur Sed Foundation', 4),
('Curabiturian Menu','Curabitur Sed Foundation', 5),
('Curabiturian Menu','Curabitur Sed Foundation', 6),
('Curabiturian Menu','Curabitur Sed Foundation', 7),
('Curabiturian Menu','Curabitur Sed Foundation', 8),
('Curabiturian Menu','Curabitur Sed Foundation', 9),
('Curabiturian Menu','Curabitur Sed Foundation', 10),
('A Star Menu', 'A Corporation',1),
('A Star Menu', 'A Corporation',2),
('A Star Menu', 'A Corporation',3),
('A Star Menu', 'A Corporation',4),
('A Star Menu', 'A Corporation',5),
('A Star Menu', 'A Corporation',6),
('A Star Menu', 'A Corporation',7),
('A Star Menu', 'A Corporation',8),
('A Star Menu', 'A Corporation',9),
('A Star Menu', 'A Corporation',10),
('Tellus Sem Menu', 'Tellus Sem Ltd',1),
('Tellus Sem Menu', 'Tellus Sem Ltd',2),
('Tellus Sem Menu', 'Tellus Sem Ltd',3),
('Tellus Sem Menu', 'Tellus Sem Ltd',4),
('Tellus Sem Menu', 'Tellus Sem Ltd',5),
('Tellus Sem Menu', 'Tellus Sem Ltd',6),
('Tellus Sem Menu', 'Tellus Sem Ltd',7),
('Tellus Sem Menu', 'Tellus Sem Ltd',8),
('Tellus Sem Menu', 'Tellus Sem Ltd',9),
('Tellus Sem Menu', 'Tellus Sem Ltd',10);





