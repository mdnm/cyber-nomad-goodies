import { PrismaClient, Resource } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import imageUrl from "../../public/resource-bg.png";
import Layout from "../../sections/Layout";

const prisma = new PrismaClient();

type StaticProps = {
  resource: Resource;
};

type StaticParams = {
  id: string;
};

export const getStaticPaths: GetStaticPaths<StaticParams> = async () => {
  const resources = await prisma.resource.findMany({
    select: { id: true },
  });

  return {
    paths: resources.map((resource) => ({ params: { id: resource.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  StaticProps,
  StaticParams
> = async ({ params }) => {
  const resource = await prisma.resource.findUnique({
    where: { id: params?.id },
  });

  return {
    props: {
      resource: JSON.parse(JSON.stringify(resource)),
    },
  };
};

const ViewResource: NextPage<StaticProps> = ({ resource }) => {
  return (
    <Layout>
      <div className="max-w-screen-lg mx-auto flex flex-col px-4">
        <h1 className="text-2xl font-bold mb-2">{resource.title}</h1>
        <span className="text-xl mb-8">{resource.description}</span>
        <div className="relative w-full h-[30rem] mb-4">
          <Image src={imageUrl} alt={resource.title} layout="fill" />
        </div>
        <button className="px-6 py-3 bg-sky-700 text-white rounded-lg ml-auto outline-none focus:outline-offset-0 focus:outline-sky-300 focus:outline-[3px] transition-all">
          Visit
        </button>
      </div>
    </Layout>
  );
};

export default ViewResource;
