import Link from "next/link";

interface BackProps {
  text?: string;
  href?: string;
}
function Back(props: BackProps) {
  return (
    <Link
      href={props.href || "/"}
      className="py-2 mt-4 px-4 left-8 text-foreground bg-btn-background rounded-md no-underline hover:bg-btn-background-hover flex items-center group text-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>{" "}
      {props.text || "Back"}
    </Link>
  );
}

export default Back;
