import Link from "next/link";
import constants from "@/misc/constants";
import Image from "next/image";
import DevpostLogo from "@/public/devpost.svg";
import {
  FaCalendar,
  FaInfoCircle,
  FaInstagram,
  FaLinkedin,
  FaMoneyBillWave,
} from "react-icons/fa";
import { type IconType } from "react-icons";

interface _LinkProps {
  title: string;
  Icon: IconType | JSX.ElementType;
  href: string;
  /**
   * Tailwind color class
   * @example bg-yellow-800
   */
  bgColor: string;
}
const _Link = (props: _LinkProps) => (
  <Link className="w-full md:w-1/2" href={props.href}>
    <button
      className={`${props.bgColor} inline-flex hover:bg-white hover:text-black text-white py-2 px-4 hover:px-8 transition-all rounded-md w-full`}
    >
      <props.Icon className="w-5 h-5 mt-1" />
      &nbsp; {props.title}
    </button>
  </Link>
);

export default function ExtraLinks() {
  return (
    <>
      <_Link
        title="Add to calendar"
        href="/events.ics"
        Icon={FaCalendar}
        bgColor="bg-yellow-800"
      />
      <_Link
        title="Information packet"
        href={constants.infoPacket}
        Icon={FaInfoCircle}
        bgColor="bg-indigo-800"
      />
      <_Link
        title="Sponsor us"
        href={constants.sponsorPacket}
        Icon={FaMoneyBillWave}
        bgColor="bg-green-800"
      />
      <_Link
        title="Devpost"
        href={constants.devpost}
        Icon={() => (
          <Image
            className="mt-1"
            alt="devpost logo"
            src={DevpostLogo}
            width={24}
            height={24}
          />
        )}
        bgColor="bg-cyan-900"
      />
      <_Link
        title="LinkedIn"
        href={constants.linkedin}
        Icon={FaLinkedin}
        bgColor="bg-blue-900"
      />
      <_Link
        title="Instagram"
        href={constants.instagram}
        Icon={FaInstagram}
        bgColor="bg-pink-600"
      />
    </>
  );
}
