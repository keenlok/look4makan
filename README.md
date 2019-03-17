#Restaurant Reservation 
This is a restaurant reservation application that allows diners to book 
reservations at restaurants (e.g., https://www.chope.co). Restaurants can advertise their availability
(e.g., cuisine type, branch locations, opening hours, menu prices) and diners can search for 
restaurants to book reservations by providing various information (e.g., date and time, cusine 
type, number of people, budget, preferred locations) and rate restaurants based on their dinning 
experience. Each booking can be confirmed based on various criteria (e.g., booking time, availability,
number of diners). Dinners could cancel or make changes to their reservations. The system could provide 
various incentives (e.g., award points for each confirmed booking) to retain users. Each user has an 
account, and administrators can create/modify/delete entries.


##Required Features:
-[ ] Login
-[ ] Add Reservations
-[ ] Home page with available restaurants at current time
-[ ] Find Restaurants with conditions
-[ ] 


##Installation process:
1. Download/clone
2. Run `npm install`
3. Setup `.env` file with the following line inside:
`DATABASE_URL=postgres://username:password@host_address:port/database_name`
4. Run `npm run start`