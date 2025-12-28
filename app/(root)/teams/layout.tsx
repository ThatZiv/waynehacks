import Back from "@/components/Back";
import WayneHacksLogo from "@/components/WayneHacksLogo";

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3  text-dark">
        <Back href="/application" />
        <div className="flex flex-col items-center ">
          <WayneHacksLogo />
        </div>
        {children}
      </div>
    </div>
  );
}
