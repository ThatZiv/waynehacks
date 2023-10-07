// https://github.com/WSU-Society-of-Computer-Developers/summer-project/blob/main/server/docker/pb/hooks/discord.js

import { SupabaseClient } from "@supabase/supabase-js";

export class DiscordWebhook {
    private username: string;
    constructor() {
        this.username = "waynehacks.com";
    }
    /**
     * @param {string} title
     * @param {string} content
     * @param {string} url (optional)
     */
    send(title: string, content: string, url?: string) {
        const payload = {
            username: this.username,
            embeds: [
                {
                    type: "rich",
                    title,
                    description: this.truncate(content),
                    color: 0x277222,
                    url: url || process.env.NEXT_PUBLIC_BASE_URL,
                    timestamp: new Date().toISOString(),
                },
            ],
        };
        return process.env.NODE_ENV === "production" ? fetch(process.env.DISCORD_WEBHOOK_URL as string, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        }) : new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(payload);
            }, 1000);
        }); // don't send in dev
    }
    truncate(str: string, n = 1300) {
        return str.length > n ? str.slice(0, n - 1) + "..." : str;
    }
};

export class SupabaseFunctions {
    private supabase: SupabaseClient;
    constructor(sb: SupabaseClient) {
        this.supabase = sb;
    }
    async getApplicants() {
        try {
            console.log("fetching applicants " + new Date().toLocaleTimeString());
            const { data: applicants, error } = await this.supabase.rpc(
                "count_applicants"
            );
            if (error) throw error
            return applicants;
        } catch (e) {
            console.error(e);
            return ">50";
        }
    }

    async getConfigValue(key: string) {
        try {

            const { data: value, error } = await this.supabase.from(
                "kv"
            ).select("value").eq("key", key).limit(1).single();
            console.log("fetching config value " + new Date().toLocaleTimeString());
            if (error) throw error

            return value.value!.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

export const hcaptchaCheck = async (token: string) => {
    const verifyResp = await fetch(`https://hcaptcha.com/siteverify?secret=${process.env.HCAPTCHA_SECRET_KEY}&response=${token}`, { cache: "no-store" });
    const verifyJson = await verifyResp.json();
    return verifyJson.success
}