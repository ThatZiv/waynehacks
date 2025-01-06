set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_email_exists(email text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  RETURN EXISTS(SELECT 1 FROM auth.users WHERE users.email = $1);
END;
$function$
;


