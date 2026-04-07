import { Event } from "./events";

// TODO: this doesnt work...use my prev _ method
const easternFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const extractEasternParts = (timestamp: number) => {
  const parts = easternFormatter.formatToParts(new Date(timestamp));
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    year: Number(map.year),
    month: Number(map.month),
    day: Number(map.day),
    hour: Number(map.hour),
    minute: Number(map.minute),
    second: Number(map.second),
  };
};

const easternWallTimeToUtc = (
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number,
) => {
  let guess = Date.UTC(year, month - 1, day, hour, minute, second);
  const targetWall = Date.UTC(year, month - 1, day, hour, minute, second);

  for (let i = 0; i < 3; i++) {
    const actual = extractEasternParts(guess);
    const actualWall = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
      actual.second,
    );
    const delta = targetWall - actualWall;
    if (delta === 0) return guess;
    guess += delta;
  }

  return guess;
};

// Parses a datetime string as Eastern Time (handles EST/EDT by date)
export const _ = (dateString: string) => {
  const hasExplicitZone =
    /(?:\b(?:UTC|GMT|EST|EDT)\b|Z|[+-]\d{2}:?\d{2})/i.test(dateString);

  if (hasExplicitZone) {
    return new Date(dateString).getTime();
  }

  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return Number.NaN;

  return easternWallTimeToUtc(
    parsed.getFullYear(),
    parsed.getMonth() + 1,
    parsed.getDate(),
    parsed.getHours(),
    parsed.getMinutes(),
    parsed.getSeconds(),
  );
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
