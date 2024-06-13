export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="backdrop-filter backdrop-blur-md transition-all hover:backdrop-blur-lg md:border-r-[5px] md:border-l-[5px] md:border-b-[5px] md:rounded-b-lg border-[#e5888c] p-2">
      <span className="drop-shadow-lg">{children}</span>
    </span>
  );
}
