import Image from "next/image";
import whacks2 from "@/public/icon.png";

export const metadata = {
  title: "WayneHacks Admin",
  description: "You shouldn't be here...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex content-center  drop-shadow-lg">
        <Image
          src={whacks2}
          width={120}
          alt="whacks logo"
          className="my-6 mx-2"
        />{" "}
        <h2 className="wh-subheading text-foreground my-9">Admin Dashboard</h2>
      </div>
      {children}
    </>
  );
}
