alter table "public"."applications" add column "shirt_size" character varying;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_value(key_id text)
 RETURNS jsonb
 LANGUAGE plpgsql
AS $function$DECLARE
  result TEXT;
BEGIN
  EXECUTE 'select value from kv where key = $1' INTO result USING key_id;
  RETURN result;
END;$function$
;

CREATE OR REPLACE FUNCTION public.is_admin(uid uuid)
 RETURNS boolean
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
declare
  result BOOLEAN;
BEGIN
  EXECUTE 'SELECT EXISTS (SELECT 1 FROM public.admins WHERE id = $1 AND is_admin = true)' INTO result USING uid;
  RETURN result;
END;
$function$
;


