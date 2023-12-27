import Link from "next/link";
import WSULogo from "./WSULogo";
import constants from "@/misc/constants";

function Footer() {
  return (
    <footer className="mt-auto bottom-0 left-0 z-20 w-full p-4 shadow md:flex md:items-center md:justify-between md:p-6 bg-black border-gray-800">
      <span className="text-sm text-gray-200 sm:text-center dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <Link
            href="https://scd.cs.wayne.edu/"
            target="_blank"
            className="font-bold hover:underline"
          >
            SCD
          </Link>
        </p>
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-300 dark:text-gray-400 sm:mt-0">
        <li>
          <Link href="/application" className="mr-4 hover:underline md:mr-6">
            View Application
          </Link>
        </li>
        <li>
          <Link
            href={constants.infoPacket}
            className="mr-4 hover:underline md:mr-6"
          >
            Information Packet
          </Link>
        </li>
        <li>
          <Link
            href="/login?signup=true"
            className="mr-4 hover:underline md:mr-6"
          >
            Sign Up
          </Link>
        </li>
        <li>
          <Link
            href={`mailto:${constants.supportEmail}?subject=WayneHacks Sponsorship`}
            className="mr-4 hover:underline md:mr-6"
          >
            Sponsor Us
          </Link>
        </li>
        <li>
          <Link
            href={`mailto:${constants.supportEmail}?subject=WayneHacks Support`}
            className="hover:underline"
          >
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
