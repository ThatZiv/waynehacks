import { Spotlight } from "@/components/ui/spotlight-new";

import { Toaster } from "@/components/ui/sonner";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // #e5888c
    <span>
      <Spotlight />
      <Toaster />
      <span className="drop-shadow-lg">{children}</span>
    </span>
  );
}
