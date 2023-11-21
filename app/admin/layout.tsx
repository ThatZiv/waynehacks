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
    <>
      <div className="flex justify-center">
        <Image
          src={whacks2}
          width={150}
          height={100}
          alt="whacks logo"
          className="m-[-40px] mb-[-25px]"
        />{" "}
        <h2 className="wh-subheading text-white p-6">Admin Dashboard</h2>
      </div>
      {children}
    </>
  );
}
