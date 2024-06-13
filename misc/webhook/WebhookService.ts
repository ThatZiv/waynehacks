import { DiscordWebhook } from "./DiscordWebhook";
import { TeamsWebhook } from "./TeamsWebhook";
import { Webhook } from "./Webhook";

// class to send all webhooks from a webhooks store
export class WebhookService {
  private webhooks: Webhook[] = [];
  constructor(...webhooks: Webhook[]) {
    this.webhooks = webhooks;
  }
  private add(webhook: Webhook) {
    this.webhooks.push(webhook);
    return this;
  }
  // send a message through all webhooks
  async send(title: string, content: string, url?: string) {
    if (process.env.NODE_ENV === "development") {
      console.log("Not sending webhook in development");
      return Promise.resolve();
    }
    return Promise.all(
      this.webhooks.map((webhook) => webhook.send(title, content, url))
    );
  }
}

export const Notifier = new WebhookService(
  new DiscordWebhook(),
  new TeamsWebhook()
);
