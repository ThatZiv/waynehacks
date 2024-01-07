import { Event } from "./events";

// will convert date string into an EST date timestamp
export const _ = (date: string) => {
  let d = new Date(date);
  d.setMinutes(d.getMinutes() + d.getTimezoneOffset() - 300);
  return d.getTime();
};

/**
 * Order matters
 */
export const events: Event[] = [
  {
    date: _("January 13, 2024 9:00:00"),
    end: _("January 13, 2024 11:00:00"),
    name: "Check-in",
  },
  {
    date: _("January 13, 2024 11:00:00"),
    end: _("January 13, 2024 12:00:00"),
    name: "Opening Ceremony",
  },
  {
    date: _("January 13, 2024 12:00:00"),
    name: "Hacking Begins",
  },
  {
    date: _("January 13, 2024 12:10:00"),
    end: _("January 13, 2024 13:00:00"),
    name: "Team Matchmaking",
  },
  {
    date: _("January 13, 2024 17:00:00"),
    end: _("January 13, 2024 19:00:00"),
    name: "Workshop Event",
  },
  {
    date: _("January 13, 2024 23:00:00"),
    name: "Building Closes",
  },
  {
    date: _("January 14, 2024 8:00:00"),
    name: "Building Opens",
  },
  {
    date: _("January 14, 2024 11:00:00"),
    end: _("January 14, 2024 12:00:00"),
    name: "Last Minute Help for Submissions",
  },
  {
    date: _("January 14, 2024 12:00:00"),
    name: "Hacking Ends",
  },
  {
    date: _("January 14, 2024 12:30:00"),
    end: _("January 14, 2024 14:30:00"),
    name: "Presentations/Judging",
  },
  {
    date: _("January 14, 2024 14:30:00"),
    end: _("January 14, 2024 15:00:00"),
    name: "Closing Ceremony",
  },
];

const constants = {
  /**
   * Email for labelling internally
   */
  supportEmail: "waynestatescd+waynehacks@gmail.com",
  /**
   * Email for showcasing publicly
   */
  showcaseEmail: "waynestatescd@gmail.com",
  address: "5105 Anthony Wayne Dr, Detroit, MI 48202",
  addressURL: "https://maps.app.goo.gl/REau4tD9HgfXnDQH7",
  infoPacket:
    "https://docs.google.com/document/d/1qKmBH7MM_muJbYMIXYA0UeWu_Sgb8ZFEf2xtRh9VlQA/edit?usp=sharing",
  discord: "https://discord.gg/ET6MMTFgay",
  devpost: "https://waynehacks-2.devpost.com/",
};

export default constants;
