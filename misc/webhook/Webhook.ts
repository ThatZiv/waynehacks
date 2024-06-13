export class Webhook {
  protected url: string;
  protected username: string;
  protected bypass: boolean = false;
  constructor(url: string, username: string) {
    this.url = url;
    this.username = username;
  }

  send(title: string, content: string, url?: string) {
    throw new Error("Method not implemented.");
  }
}
