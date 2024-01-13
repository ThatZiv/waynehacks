drop policy "Enable update statusfor admins" on "public"."status";

create policy "Enable update status for admins"
on "public"."status"
as permissive
for update
to authenticated
using ((is_admin(auth.uid()) OR (status <> 'rejected'::text) OR (status = 'cancelled'::text)))
with check (((status = 'cancelled'::text) OR (status = 'applied'::text)));



