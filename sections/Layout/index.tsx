import Head from "next/head";
import React from "react";
import Header from "../Header";

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Head>
        <title>Cyber Nomad Goodies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {children}
    </div>
  );
};

export default Layout;
