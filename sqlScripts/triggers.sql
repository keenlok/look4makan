CREATE OR REPLACE FUNCTION cannotChng()
RETURNS TRIGGER AS $$
 BEGIN IF NEW.password <> OLD.password then
  raise notice 'Cannot change password';
 RETURN NULL;
 ELSE RETURN NEW;
end if;
end; $$ LANGUAGE plpgsql;

create trigger prevent_password_changes
before update
on diners
for each row
execute procedure cannotChng();

update diners
set "password" = 0
where username = 'lokeen';

select * from diners