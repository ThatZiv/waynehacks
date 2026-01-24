-- Add trigger to enforce team size limit atomically and prevent race conditions
-- This trigger locks the team row and checks the count before allowing joins

CREATE OR REPLACE FUNCTION public.enforce_team_size_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  team_count integer;
  team_exists boolean;
BEGIN
  -- Only check when joining a team (team_id is not null)
  IF NEW.team_id IS NULL THEN
    RETURN NEW;
  END IF;

  -- Lock the team row for update to prevent concurrent modifications
  -- This ensures atomicity and prevents race conditions
  -- Also validates that the team exists
  SELECT EXISTS(SELECT 1 FROM public.teams WHERE id = NEW.team_id FOR UPDATE)
  INTO team_exists;
  
  IF NOT team_exists THEN
    RAISE EXCEPTION 'Team does not exist.';
  END IF;

  -- Count current team members
  -- For UPDATE: only exclude the user if they're already in this same team
  IF TG_OP = 'UPDATE' AND OLD.team_id IS NOT DISTINCT FROM NEW.team_id THEN
    -- User is staying in the same team, exclude them from count
    SELECT COUNT(*) INTO team_count
    FROM public.team_members
    WHERE team_id = NEW.team_id AND id IS DISTINCT FROM NEW.id;
  ELSE
    -- User is joining a new team (INSERT or UPDATE from different team)
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
