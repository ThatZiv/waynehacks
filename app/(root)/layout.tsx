export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="backdrop-filter backdrop-blur-md transition-all hover:backdrop-blur-lg">
      <span className="drop-shadow-md">{children}</span>
    </span>
  );
}
