export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // #e5888c
    <span>
      <span className="drop-shadow-lg">{children}</span>
    </span>
  );
}
