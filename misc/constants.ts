import { Event } from "./events";

// this function will force the date to be in EST
export const _ = (dateString: string) => {
  return new Date(`${dateString} GMT-0400`).getTime();
};

/**
 * Order matters
 */
export const events: Event[] = [
  {
    date: _("April 11, 2026 9:00:00"),
    end: _("April 11, 2026 11:00:00"),
    name: "Check-in",
  },
  {
    date: _("April 11, 2026 11:00:00"),
    end: _("April 11, 2026 12:00:00"),
    name: "Opening Ceremony",
  },
  {
    date: _("April 11, 2026 12:00:00"),
    name: "Hacking Begins",
  },
  {
    date: _("April 11, 2026 13:00:00"),
    name: "Lunch",
  },
  // 3 PM - 4 PM: Event
  // 5 PM - 6 PM: Event
  // 7 PM - 8 PM: Speaker Event: Building with AI without Slop
  {
    date: _("April 11, 2026 15:00:00"),
    end: _("April 11, 2026 16:00:00"),
    name: "Event",
  },
  {
    date: _("April 11, 2026 17:00:00"),
    end: _("April 11, 2026 18:00:00"),
    name: "Event",
  },
  {
    date: _("April 11, 2026 19:00:00"),
    end: _("April 11, 2026 20:00:00"),
    name: "Speaker Event: Building with AI without Slop",
  },
  {
    date: _("April 11, 2026 20:30:00"),
    name: "Dinner",
  },
  {
    date: _("April 12, 2026 9:30:00"),
    name: "Breakfast",
  },
  {
    date: _("April 12, 2026 11:00:00"),
    end: _("April 12, 2026 12:00:00"),
    name: "Last Minute Help for Submissions",
  },
  {
    date: _("April 12, 2026 12:00:00"),
    name: "Hacking Ends",
  },
  {
    date: _("April 12, 2026 12:30:00"),
    end: _("April 12, 2026 14:30:00"),
    name: "Presentations/Judging",
  },
  {
    date: _("April 12, 2026 14:30:00"),
    end: _("April 12, 2026 15:00:00"),
    name: "Closing Ceremony",
  },
];

const constants = {
  /**
   * Email for labelling internally
   */
  supportEmail: "scd@wayne.edu",
  /**
   * Email for showcasing publicly
   */
  showcaseEmail: "scd@wayne.edu",
  address: "440 Burroughs St, Detroit, MI 48202",
  addressURL: "https://maps.app.goo.gl/dp4XmUPqqX42riNRA",
  infoPacket:
    "https://docs.google.com/document/d/1nniHacxkRLR_SuGKbCdRN_t6-SuyTAIgjxluYDXx06Y/",
  sponsorPacket:
    "https://docs.google.com/document/d/13tEdmoJyzcw6o2Blcg4Cag6X1ZDPPs47D000QhmRSAI/",
  discord: "https://discord.gg/nhPYsD7Ew5",
  devpost: "https://waynehacks-4.devpost.com/",
  linkedin: "https://linkedin.com/company/waynehacks",
  instagram: "https://instagram.com/wayne.hacks",
};

export default constants;
