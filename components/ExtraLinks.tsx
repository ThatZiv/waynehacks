import Link from "next/link";
import constants from "@/misc/constants";
import Image from "next/image";
import DevpostLogo from "/public/devpost.svg";
import { FaCalendar, FaInfoCircle, FaMoneyBillWave } from "react-icons/fa";

export default function ExtraLinks() {
  return (
    <>
      <Link href="/events.ics" target="_blank" className="w-1/2">
        <button className="bg-yellow-800 inline-flex hover:bg-white hover:text-black text-white py-2 px-4 hover:px-8 transition-all rounded-md w-full">
          <FaCalendar className="w-5 h-5 mt-1" />
          &nbsp; Add to calendar
        </button>
      </Link>
      <Link href={constants.infoPacket} target="_blank" className="w-1/2">
        <button className="bg-indigo-800 inline-flex hover:bg-white hover:text-black text-white py-2 px-4 hover:px-8 transition-all rounded-md w-full">
          <FaInfoCircle className="w-5 h-5 mt-1" />
          &nbsp; Information Packet
        </button>
      </Link>
      <Link href={constants.sponsorPacket} target="_blank" className="w-1/2">
        <button className="bg-green-800 inline-flex hover:bg-white hover:text-black text-white py-2 px-4 hover:px-8 transition-all rounded-md w-full">
          <FaMoneyBillWave className="w-5 h-5 mt-1" />
          &nbsp; Sponsor Us
        </button>
      </Link>
      <Link href={constants.devpost} target="_blank" className="w-1/2">
        <button className="bg-cyan-900 inline-flex hover:bg-white hover:text-black text-white py-2 px-4 hover:px-8 transition-all rounded-md w-full">
          <Image
            className="mt-1"
            alt="devpost logo"
            src={DevpostLogo}
            width={24}
            height={24}
          />
          &nbsp; Devpost
        </button>
      </Link>
    </>
  );
}
