import React from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/images/haitien/logo.png";

export interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-48" }) => {
  const customLogoSrc = process.env.NEXT_PUBLIC_SUPABASE_LOGO_URL?.trim();
  const customLogoLightSrc =
    process.env.NEXT_PUBLIC_SUPABASE_LOGO_LIGHT_URL?.trim();

  const logoSrc = customLogoSrc || logoImg;
  const logoLightSrc = customLogoLightSrc || logoSrc;

  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block focus:outline-none focus:ring-0 ${className}`}
    >
      <Image
        className="block max-h-24 w-auto dark:hidden"
        src={logoSrc}
        alt="Yara Logo"
        width={logoImg.width}
        height={logoImg.height}
        priority
      />
      <Image
        className="hidden max-h-24 w-auto dark:block"
        src={logoLightSrc}
        alt="Yara Logo"
        width={logoImg.width}
        height={logoImg.height}
        priority
      />
    </Link>
  );
};

export default Logo;
