import { Event } from "./events";

/**
 * Order matters
 */
export const events: Event[] = [
  {
    date: new Date("January 13, 2024 9:00:00").getTime(),
    end: new Date("January 13, 2024 11:00:00").getTime(),
    name: "Check-in",
  },
  {
    date: new Date("January 13, 2024 11:00:00").getTime(),
    end: new Date("January 13, 2024 12:00:00").getTime(),
    name: "Opening Ceremony",
  },
  {
    date: new Date("January 13, 2024 12:00:00").getTime(),
    name: "Hacking Begins",
  },
  {
    date: new Date("January 13, 2024 12:10:00").getTime(),
    end: new Date("January 13, 2024 13:00:00").getTime(),
    name: "Team Matchmaking",
  },
  {
    date: new Date("January 13, 2024 17:00:00").getTime(),
    end: new Date("January 13, 2024 19:00:00").getTime(),
    name: "Workshop Event",
  },
  {
    date: new Date("January 13, 2024 23:00:00").getTime(),
    name: "Building Closes",
  },
  {
    date: new Date("January 14, 2024 8:00:00").getTime(),
    name: "Building Opens",
  },
  {
    date: new Date("January 14, 2024 11:00:00").getTime(),
    end: new Date("January 14, 2024 12:00:00").getTime(),
    name: "Last Minute Help for Submissions",
  },
  {
    date: new Date("January 14, 2024 12:00:00").getTime(),
    name: "Hacking Ends",
  },
  {
    date: new Date("January 14, 2024 12:30:00").getTime(),
    end: new Date("January 14, 2024 14:30:00").getTime(),
    name: "Presentations/Judging",
  },
  {
    date: new Date("January 14, 2024 14:30:00").getTime(),
    end: new Date("January 14, 2024 15:00:00").getTime(),
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
