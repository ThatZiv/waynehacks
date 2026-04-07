// https://github.com/WSU-Society-of-Computer-Developers/summer-project/blob/main/server/docker/pb/hooks/discord.js

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { Event } from "@/misc/events";

export class SupabaseFunctions {
  private supabase: SupabaseClient;
  constructor(sb: SupabaseClient) {
    this.supabase = sb;
  }
  async getTotalUsers() {
    try {
      const { data: users, error } = await this.supabase.rpc("count_users");
      if (error) throw error;
      return users;
    } catch (e) {
      console.error(e);
      return "-";
    }
  }
  async getApplicants() {
    try {
      console.log("fetching applicants " + new Date().toLocaleTimeString());
      const { data: applicants, error } =
        await this.supabase.rpc("count_applicants");
      if (error) throw error;
      return applicants;
    } catch (e) {
      console.error(e);
      return "-";
    }
  }

  async emailExists(email: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase.rpc("check_email_exists", {
        email,
      });
      if (error) throw error;
      return Boolean(data);
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getConfigValue(key: string) {
    try {
      const { data: value, error } = await this.supabase
        .from("kv")
        .select("value")
        .eq("key", key)
        .limit(1)
        .single();
      console.log(
        "fetching config value " + key + " " + new Date().toLocaleTimeString(),
      );
      if (error) throw error;
      // if (process.env.VERCEL_ENV == "development") {
      //     if (key == "canRegister") return true;
      // }
      return value.value?.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

// these helpers are not necessary
const normalizeTimestamp = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
};

const normalizeSchedule = (value: unknown): Event[] => {
  if (!Array.isArray(value)) return [];

  const schedule = value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;

      const maybeEvent = entry as {
        date?: unknown;
        end?: unknown;
        name?: unknown;
      };
      const date = normalizeTimestamp(maybeEvent.date);
      const end = normalizeTimestamp(maybeEvent.end);
      const name =
        typeof maybeEvent.name === "string" ? maybeEvent.name.trim() : "";

      if (date === null || !name) return null;

      return {
        date,
        end: end ?? undefined,
        name,
      } as Event;
    })
    .filter((event): event is Event => event !== null)
    .sort((a, b) => a.date - b.date);

  return schedule;
};

const createCachedSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase env vars are missing for cached schedule access");
  }

  return createClient(url, key);
};

export const getSchedule = unstable_cache(
  async () => {
    const supabase = createCachedSupabaseClient();
    const whacks = new SupabaseFunctions(supabase);
    const schedule = await whacks.getConfigValue("schedule");

    return normalizeSchedule(schedule);
  },
  ["kv-schedule"],
  {
    revalidate: 600,
    tags: ["schedule"],
  },
);

export const hcaptchaCheck = async (token: string) => {
  const verifyResp = await fetch(
    `https://hcaptcha.com/siteverify?secret=${process.env.HCAPTCHA_SECRET_KEY}&response=${token}`,
    { cache: "no-store" },
  );
  const verifyJson = await verifyResp.json();
  return verifyJson.success;
};

/**
 * Capitalizes the first letter of each word in a string
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str: string) =>
  str
    .split(" ")
    .map((word) => {
      const dontCapitalize = [
        "of",
        "a",
        "the",
        "or",
        "for",
        "nor",
        "but",
        "yet",
        "and",
      ];
      if (dontCapitalize.includes(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
