import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="justify-start flex items-center">
      <Link href="/">
        <Image
          className="min-w-[110px] min-h-[50px]"
          src="/images/logo/logo.svg"
          width="110"
          height="50"
          alt="Logo"
        />
      </Link>
    </div>
  );
}

export default Logo;
