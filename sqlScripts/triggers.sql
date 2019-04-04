create or replace function youShallNotPass()
returns trigger as $$
    begin if NEW.password <> OLD.password then
        raise notice 'Cannot Change Password';
        return null;
    else return NEW;
end; $$ Language plpgsql;

create trigger prevent_password_changes
before update
on diners
for each row
execute procedure youShallNotPass();

update diners
set "password" = 0
where username = 'lokeen';