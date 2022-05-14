import type { NextPage } from "next";
import Head from "next/head";
import Logo from "../components/Logo";
import ResourcesGrid from "../components/ResourcesGrid";

const Home: NextPage = () => {
  const resources = [
    {
      id: "1",
      title: "Remotive",
      description:
        "The #1 Remote Work Community, Remotive Handpicks Remote Jobs.",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full shadow-md py-6 px-4 mb-32">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <Logo />

          <span className="text-base">Share a resource</span>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto flex justify-between items-start gap-20 px-4">
        <aside className="flex flex-col gap-4">
          <CategoryLink active link="#">
            All Resources
          </CategoryLink>
          <CategoryLink link="#">Remote Jobs</CategoryLink>
          <CategoryLink link="#">Remote Freelance Boards</CategoryLink>
          <CategoryLink link="#">Research</CategoryLink>
          <CategoryLink link="#">Tax</CategoryLink>
          <CategoryLink link="#">Visa</CategoryLink>
          <CategoryLink link="#">Accommodation</CategoryLink>
          <CategoryLink link="#">Travel</CategoryLink>
          <CategoryLink link="#">Languages</CategoryLink>
          <CategoryLink link="#">Leisure</CategoryLink>
          <CategoryLink link="#">Others</CategoryLink>
        </aside>

        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-7">All Resources</h1>

          <ResourcesGrid resources={resources} />
        </div>
      </main>
    </div>
  );
};

type CategoryLinkProps = {
  link: string;
  active?: boolean;
};

function CategoryLink({
  children,
  link,
  active,
}: React.PropsWithChildren<CategoryLinkProps>) {
  return (
    <a
      href={link}
      className={`text-base ${active ? "text-black" : "text-sky-500"}`}
    >
      {children}
    </a>
  );
}

export default Home;
