import { Event } from "./events";

// this function will force the date to be in EST
export const _ = (dateString: string) => {
  return new Date(dateString + " EST").getTime();
};

/**
 * Order matters
 */
export const events: Event[] = [
  // {
  //   date: _("January 18, 2025 9:00:00"),
  //   end: _("January 18, 2025 11:00:00"),
  //   name: "Check-in",
  // },
  // {
  //   date: _("January 18, 2025 11:00:00"),
  //   end: _("January 18, 2025 12:00:00"),
  //   name: "Opening Ceremony",
  // },
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
  supportEmail: "waynestatescd+waynehacks@gmail.com",
  /**
   * Email for showcasing publicly
   */
  showcaseEmail: "waynestatescd@gmail.com",
  address: "5105 Anthony Wayne Dr, Detroit, MI 48202",
  addressURL: "https://maps.app.goo.gl/REau4tD9HgfXnDQH7",
  infoPacket:
    "https://docs.google.com/document/d/1qKmBH7MM_muJbYMIXYA0UeWu_Sgb8ZFEf2xtRh9VlQA/edit?usp=sharing",
  sponsorPacket:
    "https://docs.google.com/document/d/1xBuGjslnOK2wr4ZEi3Vpcx8O9kzx3Er3ZjfTE8b4cjA/edit?usp=sharing",
  discord: "https://discord.gg/ET6MMTFgay",
  devpost: "https://waynehacks-2.devpost.com/",
};

export default constants;
