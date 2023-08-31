import Link from "next/link";
import WSULogo from "./WSULogo";

function Footer() {
  return (
    <div>
      {/* <Link href="https://wayne.edu" target="_blank">
        <WSULogo />
      </Link> */}
      <div className="flex justify-center text-foreground text-center text-xs">
        <p className="pt-12">
          &copy; {new Date().getFullYear()}{" "}
          <Link
            href="https://scd.cs.wayne.edu/"
            target="_blank"
            className="font-bold hover:underline"
          >
            SCD
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
