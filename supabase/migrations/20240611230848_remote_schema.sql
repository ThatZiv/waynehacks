set check_function_bodies = off;

CREATE OR REPLACE FUNCTION auth.check_duplicate_email()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = NEW.email) THEN
    raise exception 'Email is already registered by someone else.';
  END IF;
  
  RETURN NEW;
END;
  $function$
;

CREATE OR REPLACE FUNCTION auth.check_duplicate_email2()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  IF EXISTS (SELECT 1 FROM auth.users WHERE email = NEW.email) THEN
    raise exception 'Email is already registered by someone else.';
  END IF;

  RETURN NEW;
END;
  $function$
;

CREATE OR REPLACE FUNCTION auth.check_duplicate_email3()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  IF EXISTS(SELECT 1 FROM auth.users WHERE email = NEW.email) then
    RAISE EXCEPTION 'Email is already being used by someone else';
  END IF;
  RETURN NEW;
END;$function$
;

CREATE TRIGGER check_duplicate_email BEFORE INSERT ON auth.users FOR EACH STATEMENT EXECUTE FUNCTION auth.check_duplicate_email3();

CREATE TRIGGER check_user_domain_trigger BEFORE INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION check_user_domain();


set check_function_bodies = off;

CREATE OR REPLACE FUNCTION storage.extension(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
_filename text;
BEGIN
    select string_to_array(name, '/') into _parts;
    select _parts[array_length(_parts,1)] into _filename;
    -- @todo return the last part instead of 2
    return split_part(_filename, '.', 2);
END
$function$
;

CREATE OR REPLACE FUNCTION storage.filename(name text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[array_length(_parts,1)];
END
$function$
;

CREATE OR REPLACE FUNCTION storage.foldername(name text)
 RETURNS text[]
 LANGUAGE plpgsql
AS $function$
DECLARE
_parts text[];
BEGIN
    select string_to_array(name, '/') into _parts;
    return _parts[1:array_length(_parts,1)-1];
END
$function$
;

create policy "Give users access to own folder 1jks1t9_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'resume'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1jks1t9_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'resume'::text) AND ((auth.uid())::text = (storage.foldername(name))[1])));



