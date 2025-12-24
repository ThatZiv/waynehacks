import { Spotlight } from "@/components/ui/spotlight-new";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // #e5888c
    <span>
      <Spotlight />

      <span className="drop-shadow-lg">{children}</span>
    </span>
  );
}
