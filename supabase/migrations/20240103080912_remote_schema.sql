create type "public"."APPLICATION_STATUS" as enum ('APPLIED');

drop trigger if exists "check_application_insertion" on "public"."applications";

drop policy "Enable update statusfor admins" on "public"."status";

alter table "public"."status" add column "checked_in" boolean not null default false;

create policy "Enable update statusfor admins"
on "public"."status"
as permissive
for update
to authenticated
using ((is_admin(auth.uid()) OR ((status <> 'rejected'::text) AND (status <> 'accepted'::text))))
with check ((is_admin(auth.uid()) OR ((status <> 'rejected'::text) AND (status <> 'accepted'::text))));


CREATE TRIGGER check_application_insertion AFTER INSERT ON public.applications FOR EACH STATEMENT EXECUTE FUNCTION create_status_after_sapplication_submit();
ALTER TABLE "public"."applications" ENABLE ALWAYS TRIGGER "check_application_insertion";


