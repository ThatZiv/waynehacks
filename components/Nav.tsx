"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import scdLogo from "../public/scd.png";
import wsuLogo from "../public/wsu.png";
import LogoutButton from "./LogoutButton";
import React from "react";
import Spinner from "./Spinner";

function Nav() {
  // const supabase = createClientComponentClient();
  const [user, setUser] = React.useState<any>();
  const [status, setStatus] = React.useState<"loading" | "done" | "error">(
    "loading"
  );
  React.useEffect(() => {
    setTimeout(() => status === "loading" && setStatus("error"), 5000);
    const getUser = async () => {
      const res = await fetch("/auth/user", {
        next: { tags: ["user"] },
      });
      const user = await res.json();
      setStatus("done");
      setUser(user);
    };

    getUser();
  });
  return (
    <nav
      style={{ backdropFilter: "blur(10px)" }}
      className="w-full flex justify-center border-b border-b-foreground/10 h-16"
    >
      <div className="w-full max-w-4xl flex justify-between items-center p-6 text-sm text-foreground">
        <div className="flex items-center gap-4">
          <Link href="https://scd.cs.wayne.edu/" target="_blank">
            <span className="flex items-center gap-2 hover:bg-[#fc0] hover:rounded-md transition-all">
              <Image width={40} alt="WSU Logo" src={scdLogo} />
            </span>
          </Link>
          <Link href="https://wayne.edu/" target="_blank">
            <span className="flex items-center gap-2 hover:bg-[#fc0] hover:rounded-md transition-all">
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
            <Link
              href="/login"
              className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
