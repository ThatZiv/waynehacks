import Link from "next/link";
import constants from "@/misc/constants";
import Image from "next/image";
import DevpostLogo from "/public/devpost.svg";

export default function ExtraLinks() {
  return (
    <>
      <Link href="/events.ics" target="_blank" className="w-1/2">
        <button className="bg-yellow-900 inline-flex hover:bg-white hover:text-black text-white py-2 px-4 hover:px-8 transition-all rounded-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
          &nbsp; Add to calendar
        </button>
      </Link>
      <Link href={constants.infoPacket} target="_blank" className="w-1/2">
        <button className="bg-indigo-900 inline-flex hover:bg-white hover:text-black text-white py-2 px-4 hover:px-8 transition-all rounded-md w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            color="#000000"
            viewBox="0 0 24 24"
          >
            <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 7 L 11 9 L 13 9 L 13 7 L 11 7 z M 11 11 L 11 17 L 13 17 L 13 11 L 11 11 z"></path>
          </svg>
          &nbsp; Information Packet
        </button>
      </Link>
      <Link href={constants.devpost} target="_blank" className="w-1/2">
        <button className="bg-cyan-900 inline-flex hover:bg-white hover:text-black text-white py-2 px-4 hover:px-8 transition-all rounded-md w-full">
          <Image alt="devpost logo" src={DevpostLogo} width={24} height={24} />
          &nbsp; Devpost
        </button>
      </Link>
    </>
  );
}
