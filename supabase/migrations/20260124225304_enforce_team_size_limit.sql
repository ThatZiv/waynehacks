-- Add trigger to enforce team size limit atomically and prevent race conditions
-- This trigger locks the team row and checks the count before allowing joins

CREATE OR REPLACE FUNCTION public.enforce_team_size_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  team_count integer;
BEGIN
  -- Only check when joining a team (team_id is not null)
  IF NEW.team_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Lock the team row for update to prevent concurrent modifications
  -- This ensures atomicity and prevents race conditions
  PERFORM 1 FROM public.teams 
  WHERE id = NEW.team_id 
  FOR UPDATE;

  -- Count current team members (excluding the current user if updating)
  IF TG_OP = 'UPDATE' THEN
    SELECT COUNT(*) INTO team_count
    FROM public.team_members
    WHERE team_id = NEW.team_id AND id != NEW.id;
  ELSE
    SELECT COUNT(*) INTO team_count
    FROM public.team_members
    WHERE team_id = NEW.team_id;
  END IF;

  -- Enforce the 4-member limit
  IF team_count >= 4 THEN
    RAISE EXCEPTION 'Team is full. Maximum 4 members allowed.';
  END IF;

  RETURN NEW;
END;
$function$;

-- Drop trigger if it exists and recreate it
DROP TRIGGER IF EXISTS enforce_team_size_limit_trigger ON public.team_members;

CREATE TRIGGER enforce_team_size_limit_trigger
BEFORE INSERT OR UPDATE ON public.team_members
FOR EACH ROW
EXECUTE FUNCTION public.enforce_team_size_limit();
