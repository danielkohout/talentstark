import Link from "next/link";
import "./components.css";
import { buttonVariants } from "./ui/button";

const AccessDenied = () => {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="">
        <svg
          className={`crossmark addClass animateElement`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className={`crossmark__circle addClass animateElement`}
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className={`cross__path cross__path--right addClass animateElement`}
            fill="none"
            d="M16,16 l20,20"
          />
          <path
            className={`cross__path cross__path--left addClass animateElement`}
            fill="none"
            d="M16,36 l20,-20"
          />
        </svg>
        {/* Und so weiter für die anderen SVGs */}
      </div>
      <h1 className="text-center text-xl font-bold">
        Hoppla, hierfür hast <br /> du keine Berechtigung.
      </h1>
      <div className="mt-2 flex flex-col items-center justify-center">
        <Link
          className={buttonVariants({
            variant: "outline",
          })}
          href={"/"}
        >
          Zurück zum Dashboard
        </Link>
        <Link
          className={buttonVariants({
            variant: "link",
            size: "sm",
          })}
          href={"mailto:hello@talentstark.de"}
        >
          Fehler melden
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
