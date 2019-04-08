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

update diners
set "password" = 0
where username = 'lokeen';

select * from diners

-----------------------------------------------
--Trigger to capacity of a branch to go to negative
-----------------------------------------------

create or replace function checkoverload()
returns trigger as $$
begin if 
	new.capacity < 0
then return null;
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
