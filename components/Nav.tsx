"use client";
import Image from "next/image";
import Link from "next/link";
import scdLogo from "../public/scd.png";
import wsuLogo from "../public/wsu.png";
import LogoutButton from "./LogoutButton";
import React from "react";
import Spinner from "./Spinner";
import { usePathname } from "next/navigation";
import getUser from "@/actions/getUser";

function Nav() {
  const pathname = usePathname();
  const [user, setUser] = React.useState<any>();
  const [status, setStatus] = React.useState<"loading" | "done" | "error">(
    "loading"
  );
  React.useEffect(() => {
    setTimeout(() => status === "loading" && setStatus("error"), 5000);
    const triggerGetUser = async () => {
      try {
        const user = await getUser();
        setUser(JSON.parse(user));
        setStatus("done");
      } catch (e: any) {
        setStatus("error");
      }
    };

    triggerGetUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <nav className="w-full backdrop-filter backdrop:filter bg-black flex justify-center border-b border-b-slate-200/25 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-6 text-sm text-foreground">
        <div className="flex items-center gap-1">
          <Link href="https://scd.cs.wayne.edu/" target="_blank">
            <span className="flex items-center hover:scale-110 hover:rounded-md transition-all p-3">
              <Image width={40} alt="WSU Logo" src={scdLogo} />
            </span>
          </Link>
          <Link href="https://wayne.edu/" target="_blank">
            <span className="flex items-center hover:scale-110 hover:rounded-md transition-all p-3">
              <Image width={40} alt="WSU Logo" src={wsuLogo} />
            </span>
          </Link>
        </div>
        <div />
        <div>
          {status === "loading" ? (
            <Spinner />
          ) : user ? (
            <div className="flex items-center gap-4 w-fit">
              <span className="text-[9px] sm:text-sm">Hey, {user.email}!</span>
              <LogoutButton />
            </div>
          ) : (
            pathname !== "/login" && (
              <Link
                href="/login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              >
                Login
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
