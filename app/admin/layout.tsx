import Image from "next/image";
import whacks2 from "@/public/whacks2-trans.png";

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
    <div className="mx-12">
      <div className="flex content-center">
        <Image
          src={whacks2}
          width={120}
          alt="whacks logo"
          className="my-6 mx-2"
        />{" "}
        <h2 className="wh-subheading text-dark my-9">Admin Dashboard</h2>
      </div>
      {children}
    </div>
  );
}
