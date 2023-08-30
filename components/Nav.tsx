import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import scdLogo from "../app/public/scd.png";
import wsuLogo from "../app/public/wsu.png";
import LogoutButton from "./LogoutButton";
async function Nav() {
  ("use client");
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
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
          {user ? (
            <div className="flex items-center gap-4">
              Hey, {user.email}!
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
