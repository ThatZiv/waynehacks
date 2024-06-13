import { Webhook } from "./Webhook";

export class TeamsWebhook extends Webhook {
  constructor() {
    super(process.env.TEAMS_WEBHOOK_URL as string, "waynehacks.com");
  }

  /**
   * @param {string} title
   * @param {string} content
   * @param {string} url (optional)
   */
  send(title: string, content: string, url?: string) {
    console.log("sending teams webhook", title, content, url);
    const payload = {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      summary: title,
      themeColor: "0078D7",
      title,
      text: content,
      potentialAction: [
        {
          "@type": "OpenUri",
          name: "View in browser",
          targets: [
            {
              os: "default",
              uri: url || process.env.NEXT_PUBLIC_BASE_URL,
            },
          ],
        },
      ],
    };
    return new Promise((resolve, reject) => {
      fetch(this.url, {
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
}
