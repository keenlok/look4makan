-----------------------------------------------
--Trigger to prevent change of password
-----------------------------------------------
drop trigger if exists prevent_password_changes;

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

update diners
set "password" = 0
where username = 'lokeen';

select * from diners

-----------------------------------------------
--Trigger to capacity of a branch to go to negative
-----------------------------------------------
drop trigger if exists no_overload;

create or replace function checkoverload()
returns trigger as $$
begin if 
	new.capacity < 0
then raise notice 'restaurant is too full';
return null;
else return new;
end if;
end; $$ language plpgsql;

create trigger no_overload
before update
on BookedTables
for each row
execute procedure checkoverload();

update BookedTables
set capacity = capacity - 1
where rname = 'Crystal Jade' and bid = 1 and tid = 1 and bookedtimeslot = '23:00:00' and bookeddate = '2019-05-16';

select * from BookedTables

-----------------------------------------------
--Trigger to prevent username to be less than 9 characters
-----------------------------------------------
drop trigger if exists notTooShort on diners;

create or replace function idk()
returns trigger as $$
begin if not new.isAdmin and length(NEW.username) < 9 then
	raise notice 'cannot';
	return null;
else return new;
end if; end; $$ language plpgsql;

create trigger notTooShort
before insert or update
on diners
for each row
execute procedure idk();

insert into diners  (username, firstname, lastname, password, isAdmin) values
('333asd', 'test', 'Rick', '$2b$10$QFg3/z/fXRaHlIWfftdGkOCwam0wCdfW9yfA7u93IsWL2DVSul.Ue', false);

select * from diners