// https://github.com/WSU-Society-of-Computer-Developers/summer-project/blob/main/server/docker/pb/hooks/discord.js

import { SupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

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
      const { data: applicants, error } = await this.supabase.rpc(
        "count_applicants"
      );
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
        "fetching config value " + key + " " + new Date().toLocaleTimeString()
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

export const hcaptchaCheck = async (token: string) => {
  const verifyResp = await fetch(
    `https://hcaptcha.com/siteverify?secret=${process.env.HCAPTCHA_SECRET_KEY}&response=${token}`,
    { cache: "no-store" }
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
