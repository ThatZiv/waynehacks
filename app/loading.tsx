import "./globals.css";
function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-600" />
    </div>
  );
}

export default loading;
