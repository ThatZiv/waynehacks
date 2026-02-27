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
    date: _("April 11, 2026 9:00:00"),
    end: _("April 11, 2026 11:00:00"),
    name: "Check-in (tentative)",
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
  {
    date: _("April 11, 2026 19:30:00"),
    name: "Dinner",
  },
  {
    date: _("April 11, 2026 23:00:00"),
    name: "Building Closes",
  },
  {
    date: _("April 12, 2026 9:00:00"),
    name: "Building Opens",
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
  address: "5105 Anthony Wayne Dr, Detroit, MI 48202",
  addressURL: "https://maps.app.goo.gl/REau4tD9HgfXnDQH7",
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
