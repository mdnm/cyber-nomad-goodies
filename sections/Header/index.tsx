import Link from "next/link";
import React from "react";
import Logo from "../../components/Logo";

const Header = () => {
  return (
    <header className="w-full shadow-md py-6 px-4 mb-32">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <Link href="/" passHref>
          <a>
            <Logo />
          </a>
        </Link>

        <Link href="/resources/create" passHref>
          <a className="text-base">Share a resource</a>
        </Link>
      </div>
    </header>
  );
};

export default Header;
