import { Webhook } from "./Webhook";

export class DiscordWebhook extends Webhook {
  constructor() {
    super(process.env.DISCORD_WEBHOOK_URL as string, "waynehacks.com");
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
          color: 2585122,
          url: url || process.env.NEXT_PUBLIC_BASE_URL,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    return new Promise((resolve, reject) => {
      fetch(process.env.DISCORD_WEBHOOK_URL as string, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  truncate(str: string, n = 1300) {
    return str.length > n ? str.slice(0, n - 1) + "..." : str;
  }
}
