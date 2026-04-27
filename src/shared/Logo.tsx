import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-48" }) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block focus:outline-none focus:ring-0 ${className}`}
    >
      {/* Light mode */}
      <Image
        className="block max-h-24 w-auto dark:hidden"
        src={logoImg}
        alt="Yara Logo"
        priority
      />
      {/* Dark mode — logo nền trong suốt, vàng nổi trên nền tối */}
      <Image
        className="hidden max-h-24 w-auto dark:block"
        src={logoLightImg}
        alt="Yara Logo"
        priority
      />
    </Link>
  );
};

export default Logo;

