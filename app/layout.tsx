import Nav from "@/components/Nav";
import "./globals.css";
import Footer from "@/components/Footer";
import Messages from "./login/messages";
export const metadata = {
  title: "WayneHacks",
  description: `WayneHacks is a 24-hour in-person Hackathon at Wayne State
  University. All majors and skill levels are welcome with teams up to
  four people. Prizes will be awarded to the best projects, so be
  ready!`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex flex-col items-center">
          <Nav />
          <Messages />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
