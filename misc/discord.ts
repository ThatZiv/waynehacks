// https://github.com/WSU-Society-of-Computer-Developers/summer-project/blob/main/server/docker/pb/hooks/discord.js

export default class DiscordWebhook {
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
                    url: url || process.env.NEXT_PUBLIC_BASE_URL
                },
            ],
        };
        return fetch(process.env.DISCORD_WEBHOOK_URL as string, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
        });
    }
    truncate(str: string, n = 1300) {
        return str.length > n ? str.slice(0, n - 1) + "..." : str;
    }
};
