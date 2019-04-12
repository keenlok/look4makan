drop trigger if exists prevent_password_changes on diners;
drop trigger if exists trig_validPax on books;
drop trigger if exists trig_notTooShort on diners;
drop trigger if exists trig_noTimeTravel on userpreferences;
drop trigger if exists trig_validHours on bookedtables;
-----------------------------------------------
--Trigger to prevent change of password
-----------------------------------------------

create or replace function cannotChng()
returns trigger as $$
 begin if NEW.password <> OLD.password then
  raise notice 'Cannot change password';
 return null;
 else return NEW;
end if;
end; $$ language plpgsql;

create trigger prevent_password_changes
before update
on diners
for each row
execute procedure cannotChng();

--test
update diners
set "password" = 0
where username = 'lokeen';

select * from diners;

-----------------------------------------------
--Trigger on BookedTables to make sure that capacity is valid
-----------------------------------------------
create or replace function validPax()
returns trigger as $$
begin if 
	new.pax <= 0 or new.pax > (select branchtables.capacity from branchtables where rname = new.rname and tid = new.tid and bid = new.bid)
	then raise notice 'Invalid pax number or not enough seats at this table';
	return null;
else return new;
end if;
end; $$ language plpgsql;

create trigger trig_validPax
before insert or update
on books
for each row
execute procedure validPax();

--test
update BookedTables
set capacity = capacity - 1
where rname = 'Crystal Jade' and bid = 1 and tid = 1 and bookedtimeslot = '23:00:00' and bookeddate = '2019-05-16';

insert into books (username, rname, bid, tid, pax, reservationtime, reservationdate) values
('lokeen', 'MacDonalds', 1, 1, 3, '10:00:00', '2019-04-12');

select * from userpreferences;

insert into bookedtables (rname, bid, tid, bookedtimeslot, bookeddate) values
('MacDonalds', 1, 1, '10:00:00', '2019-04-12');

insert into userpreferences (username, preferredrname, preferredloc, preferreddate, preferredtime, paxnum) values
('lokeen', 'MacDonalds', 'Jurong Point', '2019-04-12', '10:00:00', 3);

select * from books;

-----------------------------------------------
--Trigger to prevent username to be less than 9 characters
-----------------------------------------------


create or replace function notTooShort()
returns trigger as $$
begin if not new.isAdmin and length(new.username) < 9 then
	raise notice 'Username must be at least 9 characters';
	return null;
else return new;
end if; end; $$ language plpgsql;

create trigger trig_notTooShort
before insert or update
on diners
for each row
execute procedure notTooShort();

-- test
insert into diners  (username, firstname, lastname, password, isAdmin) values
('333asd', 'test', 'Rick', '$2b$10$QFg3/z/fXRaHlIWfftdGkOCwam0wCdfW9yfA7u93IsWL2DVSul.Ue', false);

select * from diners;

-----------------------------------------------
--Trigger to prevent booking the past
-----------------------------------------------


create or replace function noTimeTravel()
returns trigger as $$
begin if new.preferredDate < current_date or (new.preferredDate = current_date and new.preferredTime <= localtime) then
	raise notice 'This app is not a time machine';
	return null;
else return new;
end if;
end; $$ language plpgsql;

create trigger trig_noTimeTravel
before insert or update
on userpreferences
for each row
execute procedure noTimeTravel();

--test
insert into userpreferences (username, preferredrname, preferredloc, preferreddate, preferredtime, cuisinetype, paxnum) values
('lokeen', 'MacDonalds', 'Jurong Point', '2001-12-23' ,'14:39:53', 'Chinese', 6);
select * from userpreferences;

-----------------------------------------------
--Trigger to prevent booking timeslot outside of opening hours
-----------------------------------------------
create or replace function validHours()
returns trigger as $$
begin if 
	new.bookedtimeslot < (select branches.opentime from branches where rname = new.rname and bid = new.bid) or new.bookedtimeslot > (select branches.closetime from branches where rname = new.rname and bid = new.bid)
	then raise notice 'This branch is not opened at this time';
	return null;
else return new;
end if;
end; $$ language plpgsql;

create trigger trig_validHours
before insert or update
on BookedTables
for each row
execute procedure validHours();

--test
update BookedTables
set capacity = capacity - 1
where rname = 'Crystal Jade' and bid = 1 and tid = 1 and bookedtimeslot = '23:00:00' and bookeddate = '2019-05-16';

insert into bookedtables (rname, bid, tid, bookedtimeslot, bookeddate) values
('MacDonalds', 1, 3, 3213, '23:00:00', '2019-04-11');

select * from BookedTables;
-----------------------------------------------
--Trigger to prevent booking timeslot too close to another booking
-----------------------------------------------
drop trigger if exists trig_test on bookedtables;

create or replace function test()
returns trigger as $$
begin if exists (
	select * 
	from books 
	where rname = new.rname and 
	bid = new.bid and 
	tid = new.tid and 
	reservationdate = new.bookeddate and 
	(new.bookedtimeslot - interval '1 hour' = reservationtime or reservationtime = new.bookedtimeslot + interval '1 hour')
) then
raise exception 'Timeslot too close to another booking';
return null;
else return new;
end if;
end; $$ language plpgsql;

create trigger trig_test
before insert or update
on bookedtables
for each row
execute procedure test();

--test

select * from books;
select * from bookedtables;

insert into bookedtables (rname, bid, tid, bookedtimeslot, bookeddate) values
('MacDonalds', 1, 1, '10:12:00', '2020-01-01');