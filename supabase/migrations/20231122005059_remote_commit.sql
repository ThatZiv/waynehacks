
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."check_email_exists"("email" "text") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $_$
BEGIN
  RETURN EXISTS(SELECT 1 FROM auth.users WHERE email = $1);
END;
$_$;

ALTER FUNCTION "public"."check_email_exists"("email" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."check_user_domain"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
  IF NEW.email NOT LIKE '%\.edu' THEN
    raise exception 'Please use your University email address ending in `.edu`';
  END IF;

  RETURN NEW;
END;
  $$;

ALTER FUNCTION "public"."check_user_domain"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."count_applicants"() RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
  RETURN COUNT(applicant_id) FROM applications;
END;$$;

ALTER FUNCTION "public"."count_applicants"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."count_users"() RETURNS integer
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$BEGIN
IF not is_admin(auth.uid()) THEN
  RAISE EXCEPTION 'fuc k off';  
END IF;
  RETURN
    COUNT(email)
  from
    auth.users;

END;$$;

ALTER FUNCTION "public"."count_users"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."create_status_after_sapplication_submit"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
  INSERT INTO status (applicant_id, status)
  VALUES (auth.uid(), 'applied')
  ON CONFLICT (applicant_id)
  DO UPDATE SET status = 'applied';
  RETURN NEW;
END;
$$;

ALTER FUNCTION "public"."create_status_after_sapplication_submit"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."get_value"("key_id" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$BEGIN
  return (select value from kv where key = key_id);
END;$$;

ALTER FUNCTION "public"."get_value"("key_id" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_admin"("uid" "uuid") RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$BEGIN
  RETURN EXISTS (SELECT 1 FROM admins WHERE id = uid AND is_admin = true);
END;$$;

ALTER FUNCTION "public"."is_admin"("uid" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."no_change_app_status"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
  IF NEW.status <> OLD.status THEN
    RAISE EXCEPTION 'changing "status" is not allowed';
  END IF;

  RETURN NEW;
END;$$;

ALTER FUNCTION "public"."no_change_app_status"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."admins" (
    "id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "is_admin" boolean DEFAULT false
);

ALTER TABLE "public"."admins" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."applications" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applicant_id" "uuid" NOT NULL,
    "full_name" "text" DEFAULT ''::"text" NOT NULL,
    "university" "text" DEFAULT ''::"text" NOT NULL,
    "major" "text" DEFAULT ''::"text" NOT NULL,
    "diet" "text",
    "graduation_year" "text" DEFAULT ''::"text" NOT NULL,
    "student_id" "text" DEFAULT ''::"text" NOT NULL,
    "phone_number" "text" DEFAULT ''::"text" NOT NULL,
    "email" character varying DEFAULT 'test@test.net'::character varying NOT NULL,
    CONSTRAINT "applications_diet_check" CHECK (("length"("diet") < 500)),
    CONSTRAINT "applications_full_name_check" CHECK (("length"("full_name") < 120)),
    CONSTRAINT "applications_graduation_year_check" CHECK (("length"("graduation_year") = 4)),
    CONSTRAINT "applications_major_check" CHECK (("length"("major") < 250)),
    CONSTRAINT "applications_university_check" CHECK (("length"("university") < 100))
);

ALTER TABLE "public"."applications" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."kv" (
    "key" "text" NOT NULL,
    "value" "jsonb" NOT NULL
);

ALTER TABLE "public"."kv" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."status" (
    "applicant_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "status" "text" DEFAULT 'applied'::"text" NOT NULL,
    "note" "text" DEFAULT 'Thanks for applying. Please be on the lookout for an email or keep visiting this page for your application status.'::"text",
    "modified_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL
);

ALTER TABLE "public"."status" OWNER TO "postgres";

ALTER TABLE ONLY "public"."admins"
    ADD CONSTRAINT "admins_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."applications"
    ADD CONSTRAINT "applications_applicant_key" UNIQUE ("applicant_id");

ALTER TABLE ONLY "public"."applications"
    ADD CONSTRAINT "applications_phone_number_key" UNIQUE ("phone_number");

ALTER TABLE ONLY "public"."applications"
    ADD CONSTRAINT "applications_pkey" PRIMARY KEY ("applicant_id");

ALTER TABLE ONLY "public"."kv"
    ADD CONSTRAINT "kv_pkey" PRIMARY KEY ("key");

ALTER TABLE ONLY "public"."status"
    ADD CONSTRAINT "status_applicant_id_key" UNIQUE ("applicant_id");

ALTER TABLE ONLY "public"."status"
    ADD CONSTRAINT "statuses_pkey" PRIMARY KEY ("applicant_id");

CREATE TRIGGER "check_application_insertion" AFTER INSERT ON "public"."applications" FOR EACH STATEMENT EXECUTE FUNCTION "public"."create_status_after_sapplication_submit"();

ALTER TABLE ONLY "public"."admins"
    ADD CONSTRAINT "admins_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."applications"
    ADD CONSTRAINT "applications_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."status"
    ADD CONSTRAINT "status_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "public"."applications"("applicant_id") ON DELETE CASCADE;

CREATE POLICY "Allow update for admins" ON "public"."kv" FOR UPDATE TO "authenticated" USING ("public"."is_admin"("auth"."uid"())) WITH CHECK ("public"."is_admin"("auth"."uid"()));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."applications" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "applicant_id"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."status" FOR INSERT TO "authenticated" WITH CHECK (("auth"."uid"() = "applicant_id"));

CREATE POLICY "Enable read access for all users" ON "public"."kv" FOR SELECT USING (true);

CREATE POLICY "Enable read access for respective user" ON "public"."admins" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "id"));

CREATE POLICY "Enable select for respective user " ON "public"."status" FOR SELECT TO "authenticated" USING ((("auth"."uid"() = "applicant_id") OR "public"."is_admin"("auth"."uid"())));

CREATE POLICY "Enable update for users if their status is canceled" ON "public"."applications" FOR UPDATE TO "authenticated" USING (true) WITH CHECK ((("auth"."uid"() = "applicant_id") AND (EXISTS ( SELECT 1
   FROM "public"."status"
  WHERE (("status"."applicant_id" = "auth"."uid"()) AND ("status"."status" = 'cancelled'::"text"))))));

CREATE POLICY "Enable update statusfor admins" ON "public"."status" FOR UPDATE TO "authenticated" USING (("public"."is_admin"("auth"."uid"()) OR ("status" <> 'rejected'::"text"))) WITH CHECK (("public"."is_admin"("auth"."uid"()) OR ("status" <> 'rejected'::"text")));

CREATE POLICY "Let admins or user view their own application" ON "public"."applications" FOR SELECT TO "authenticated" USING (("public"."is_admin"("auth"."uid"()) OR ("auth"."uid"() = "applicant_id")));

ALTER TABLE "public"."admins" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."applications" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."kv" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."status" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."check_email_exists"("email" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."check_email_exists"("email" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_email_exists"("email" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."check_user_domain"() TO "anon";
GRANT ALL ON FUNCTION "public"."check_user_domain"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_user_domain"() TO "service_role";

GRANT ALL ON FUNCTION "public"."count_applicants"() TO "anon";
GRANT ALL ON FUNCTION "public"."count_applicants"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."count_applicants"() TO "service_role";

GRANT ALL ON FUNCTION "public"."count_users"() TO "anon";
GRANT ALL ON FUNCTION "public"."count_users"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."count_users"() TO "service_role";

GRANT ALL ON FUNCTION "public"."create_status_after_sapplication_submit"() TO "anon";
GRANT ALL ON FUNCTION "public"."create_status_after_sapplication_submit"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_status_after_sapplication_submit"() TO "service_role";

GRANT ALL ON FUNCTION "public"."get_value"("key_id" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_value"("key_id" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_value"("key_id" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."is_admin"("uid" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"("uid" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"("uid" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."no_change_app_status"() TO "anon";
GRANT ALL ON FUNCTION "public"."no_change_app_status"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."no_change_app_status"() TO "service_role";

GRANT ALL ON TABLE "public"."admins" TO "anon";
GRANT ALL ON TABLE "public"."admins" TO "authenticated";
GRANT ALL ON TABLE "public"."admins" TO "service_role";

GRANT ALL ON TABLE "public"."applications" TO "anon";
GRANT ALL ON TABLE "public"."applications" TO "authenticated";
GRANT ALL ON TABLE "public"."applications" TO "service_role";

GRANT ALL ON TABLE "public"."kv" TO "anon";
GRANT ALL ON TABLE "public"."kv" TO "authenticated";
GRANT ALL ON TABLE "public"."kv" TO "service_role";

GRANT ALL ON TABLE "public"."status" TO "anon";
GRANT ALL ON TABLE "public"."status" TO "authenticated";
GRANT ALL ON TABLE "public"."status" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
