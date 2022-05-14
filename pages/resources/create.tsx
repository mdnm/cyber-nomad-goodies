import type { NextPage } from "next";
import Layout from "../../sections/Layout";

const CreateResource: NextPage = () => {
  return (
    <Layout>
      <main className="max-w-screen-lg mx-auto flex flex-col px-4">
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
            className="w-full border-[1px] h-9 rounded-lg shadow-sm p-2 outline-none focus:outline-offset-0 focus:outline-gray-400 focus:outline-[3px] transition-all"
          />
        </div>
        <div className="w-full flex flex-col gap-2 mb-5">
          <label htmlFor="description" className="text-base text-gray-500">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border-[1px] h-32 rounded-lg shadow-sm p-2 outline-none focus:outline-offset-0 focus:outline-gray-400 focus:outline-[3px] transition-all"
          ></textarea>
        </div>
        <button className="px-6 py-3 bg-sky-700 text-white rounded-lg ml-auto outline-none focus:outline-offset-0 focus:outline-sky-300 focus:outline-[3px] transition-all">
          Add Resource
        </button>
      </main>
    </Layout>
  );
};

export default CreateResource;
