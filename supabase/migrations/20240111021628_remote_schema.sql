drop policy "Enable update statusfor admins" on "public"."status";

create policy "Enable update statusfor admins"
on "public"."status"
as permissive
for update
to authenticated
using ((is_admin(auth.uid()) OR ((status <> 'rejected'::text) AND (status <> 'accepted'::text)) OR (status = 'cancelled'::text)))
with check ((is_admin(auth.uid()) OR ((status <> 'rejected'::text) AND (status <> 'accepted'::text)) OR (status = 'cancelled'::text)));



