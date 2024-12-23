import { Event } from "./events";

// this function will force the date to be in EST
export const _ = (dateString: string) => {
  return new Date(dateString + " EST").getTime();
};

/**
 * Order matters
 */
export const events: Event[] = [
  {
    date: _("January 18, 2025 9:00:00"),
    end: _("January 18, 2025 11:00:00"),
    name: "Check-in",
  },
  {
    date: _("January 18, 2025 11:00:00"),
    end: _("January 18, 2025 12:00:00"),
    name: "Opening Ceremony",
  },
  {
    date: _("January 18, 2025 12:00:00"),
    name: "Hacking Begins",
  },

  {
    date: _("January 18, 2025 23:00:00"),
    name: "Building Closes",
  },
  {
    date: _("January 19, 2025 10:00:00"),
    name: "Building Opens",
  },
  {
    date: _("January 19, 2025 11:00:00"),
    end: _("January 19, 2025 12:00:00"),
    name: "Last Minute Help for Submissions",
  },
  {
    date: _("January 19, 2025 12:00:00"),
    name: "Hacking Ends",
  },
  {
    date: _("January 19, 2025 12:30:00"),
    end: _("January 19, 2025 14:30:00"),
    name: "Presentations/Judging",
  },
  {
    date: _("January 19, 2025 14:30:00"),
    end: _("January 19, 2025 15:00:00"),
    name: "Closing Ceremony",
  },
];

const constants: Record<string, any> = {
  /**
   * Email for labelling internally
   */
  supportEmail: "scd@wayne.edu",
  /**
   * Email for showcasing publicly
   */
  showcaseEmail: "scd@wayne.edu",
  address: "5105 Anthony Wayne Dr, Detroit, MI 48202",
  addressURL: "https://maps.app.goo.gl/REau4tD9HgfXnDQH7",
  infoPacket:
    "https://docs.google.com/document/d/1OX8XTbJtyVpRK3ZU4dKBTWkdbpyZK0yNNKoS7I1vZj4/edit?usp=sharing",
  sponsorPacket:
    "https://docs.google.com/document/d/1xBuGjslnOK2wr4ZEi3Vpcx8O9kzx3Er3ZjfTE8b4cjA/edit?usp=sharing",
  discord: "https://discord.gg/2KuZGsQMUS",
  devpost: "https://waynehacks-3.devpost.com/",
  linkedin: "https://linkedin.com/company/waynehacks",
  instagram: "https://instagram.com/wayne.hacks",
};

export default constants;
