export const metadata = {
  title: "WayneHacks Admin",
  description: "You shouldn't be here...",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
