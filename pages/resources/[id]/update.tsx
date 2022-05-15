import { Resource } from "@prisma/client";
import axios from "axios";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { prisma } from "../../../lib/prisma";
import Layout from "../../../sections/Layout";

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
    fallback: true,
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

type FormData = {
  image: string | ArrayBuffer | null;
  title: string;
  description: string;
  link: string;
};

const UpdateResource: NextPage<StaticProps> = ({ resource = null }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    image: "",
    title: resource?.title || "",
    description: resource?.description || "",
    link: resource?.link || "",
  });

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.item(0);
    if (!file) {
      toast.error("A file is required");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setFormData({ ...formData, image: reader.result });
    });
    reader.readAsDataURL(file);
  }

  async function handleAddResource(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toast.promise(axios.put(`/api/resources/${resource?.id}`, formData), {
      loading: "Loading...",
      success: <span>Resource updated!</span>,
      error: (error) => <span>{error.response.data.message}</span>,
    });
  }

  if (router.isFallback || !resource) {
    return <span>Loading...</span>;
  }

  return (
    <Layout>
      <form
        onSubmit={handleAddResource}
        className="max-w-screen-lg mx-auto flex flex-col px-4"
      >
        <h1 className="text-2xl font-bold mb-2">Update a resource</h1>
        <span className="text-xl text-gray-500 mb-14">
          Update the resource data
        </span>
        <div className="w-full flex flex-col gap-2 mb-6">
          <label htmlFor="image" className="text-base text-gray-500">
            Image (optional)
          </label>
          <input
            id="image"
            type="file"
            name="image"
            className="w-full border-[1px] h-12 rounded-lg shadow-sm p-2"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <label htmlFor="title" className="text-base text-gray-500">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="w-full border-[1px] h-9 rounded-lg shadow-sm p-2 outline-none focus:outline-offset-0 focus:outline-gray-400 focus:outline-[3px] transition-all"
            onChange={handleChange}
            value={formData.title}
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2 mb-5">
          <label htmlFor="description" className="text-base text-gray-500">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full border-[1px] h-32 rounded-lg shadow-sm p-2 outline-none focus:outline-offset-0 focus:outline-gray-400 focus:outline-[3px] transition-all"
            onChange={handleChange}
            value={formData.description}
            required
          ></textarea>
        </div>
        <div className="w-full flex flex-col gap-2 mb-6">
          <label htmlFor="link" className="text-base text-gray-500">
            Link
          </label>
          <input
            id="link"
            type="url"
            name="link"
            className="w-full border-[1px] h-9 rounded-lg shadow-sm p-2 outline-none focus:outline-offset-0 focus:outline-gray-400 focus:outline-[3px] transition-all"
            onChange={handleChange}
            value={formData.link}
            required
          />
        </div>
        <button className="px-6 py-3 bg-sky-700 text-white rounded-lg ml-auto outline-none focus:outline-offset-0 focus:outline-sky-300 focus:outline-[3px] transition-all">
          Update
        </button>
      </form>
    </Layout>
  );
};

export default UpdateResource;
