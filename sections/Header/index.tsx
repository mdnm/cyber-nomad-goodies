import React from "react";
import Logo from "../../components/Logo";

const Header = () => {
  return (
    <header className="w-full shadow-md py-6 px-4 mb-32">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <Logo />

        <span className="text-base">Share a resource</span>
      </div>
    </header>
  );
};

export default Header;
