import { PrismaClient, Resource } from "@prisma/client";
import type { NextPage } from "next";
import ResourcesGrid from "../components/ResourcesGrid";
import Layout from "../sections/Layout";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const resources = await prisma.resource.findMany();

  return {
    props: {
      resources: JSON.parse(JSON.stringify(resources)),
    },
  };
}

type Props = {
  resources: Resource[];
};

const Home: NextPage<Props> = ({ resources = [] }) => {
  return (
    <Layout>
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
    </Layout>
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
