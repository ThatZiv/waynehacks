import Image from "next/image";
import Link from "next/link";

interface Sponsor {
  name: string;
  link: string;
  logo: string;
  invertLogo?: boolean;
}

const sponsors: Sponsor[] = [
  {
    name: "Wayne State University - College of Engineering",
    link: "https://engineering.wayne.edu/",
    logo: "/wsu_engin.png",
  },
  {
    name: "Wayne State University - Career Services",
    link: "https://careerservices.wayne.edu/",
    logo: "/wsu_career.png",
    invertLogo: true,
  },
  {
    name: "KLA",
    link: "https://www.kla.com/",
    logo: "/kla.png",
  },
  {
    name: "Google Cloud",
    link: "https://cloud.google.com/",
    logo: "/gc.png",
  },
];

export const Sponsors = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-center mt-2">
        WayneHacks 2 would not have been possible without the help of our
        sponsors.
      </p>
      <div className="flex flex-wrap justify-center gap-8 mt-5">
        {sponsors.map((sponsor) => {
          let link = new URL(sponsor.link);
          // add utm
          link.searchParams.set("utm_source", "waynehacks.com");
          link.searchParams.set("utm_medium", "waynehacks-sponsor-card");
          link.searchParams.set("utm_campaign", "waynehacks3");
          return (
            <div key={sponsor.name} className="flex-shrink-0">
              <Link href={link.toString()} target="_blank">
                <Image
                  src={sponsor.logo}
                  className={`grayscale ${
                    sponsor.invertLogo ? "invert" : ""
                  } rounded-md transition-all duration-500 ease-in-out transform hover:scale-110`}
                  width={225}
                  height={225}
                  alt={sponsor.name}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
