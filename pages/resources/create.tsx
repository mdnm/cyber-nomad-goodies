import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../sections/Layout";

type FormData = {
  title: string;
  description: string;
};

const CreateResource: NextPage = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });

  async function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleAddResource(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toast.promise(axios.post("/api/resources", formData), {
      loading: "Loading...",
      success: <span>Resource created!</span>,
      error: (error) => <span>{error.response.data.message}</span>,
    });
  }

  return (
    <Layout>
      <form
        onSubmit={handleAddResource}
        className="max-w-screen-lg mx-auto flex flex-col px-4"
      >
        <h1 className="text-2xl font-bold mb-2">Share a resource</h1>
        <span className="text-xl text-gray-500 mb-14">
          Share a resource with your fellow cyber nomads
        </span>
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
          ></textarea>
        </div>
        <button className="px-6 py-3 bg-sky-700 text-white rounded-lg ml-auto outline-none focus:outline-offset-0 focus:outline-sky-300 focus:outline-[3px] transition-all">
          Add Resource
        </button>
      </form>
    </Layout>
  );
};

export default CreateResource;
