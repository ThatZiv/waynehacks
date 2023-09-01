import Nav from "@/components/Nav";
import "./globals.css";
import { Open_Sans, Roboto_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Messages from "../components/messages";
import React from "react";

export const metadata = {
  title: "WayneHacks",
  description: `WayneHacks is a 24-hour in-person Hackathon at Wayne State
  University. All majors and skill levels are welcome with teams up to
  four people. Prizes will be awarded to the best projects, so be
  ready!`,
  openGraph: {
    title: "WayneHacks",
    description: `WayneHacks is a 24-hour in-person Hackathon at Wayne State
    University. All majors and skill levels are welcome with teams up to
    four people. Prizes will be awarded to the best projects, so be
    ready!`,
    url: "https://hack.wayne.edu/",
    type: "website",
    locale: "en_US",
    siteName: "WayneHacks",
    images: [
      {
        url: "/whacks_logo.png",
        width: 1080,
        height: 1080,
        alt: "WayneHacks Logo",
      },
    ],
  },
  themeColor: "#000000",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  //👇 Add variable to our object
  variable: "--font-opensans",
});

//👇 Configure the object for our second font
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${robotoMono.variable} font-sans`}
    >
      <head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
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
