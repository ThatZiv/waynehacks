SELECT target_team_id IS NULL 
AND NOT EXISTS (
  -- cant let em leave their team if they're currently a leader
  SELECT 1 FROM public.teams where leader = user_uuid
) OR 
(
  SELECT (
    (EXISTS (SELECT 1 FROM public.teams t WHERE t.id = target_team_id AND (user_uuid = ANY(t.invites) OR t.open_invite = true)))
    AND (
      (SELECT COUNT(id) FROM public.team_members WHERE team_id = target_team_id) < 4
    )
    AND (
      -- make sure they're not currently a leader
      NOT EXISTS (SELECT 1 FROM public.teams where leader = user_uuid)
    )
  )
)