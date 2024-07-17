export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // #e5888c
    <span className="backdrop-filter backdrop-blur-md transition-all shadow-lg hover:backdrop-blur-lg md:border-r-[2px] md:border-l-[2px] md:border-b-[2px] md:rounded-b-lg border-[#0000001e] p-2">
      <span className="drop-shadow-lg">{children}</span>
    </span>
  );
}
