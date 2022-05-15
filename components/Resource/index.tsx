import { Resource } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = Omit<Resource, "createdAt" | "updatedAt"> & {
  link: string;
  imageUrl: string;
};

const Resource = ({ title, description, imageUrl, link }: Props) => {
  return (
    <a href={link} className="w-full max-w-xs">
      <div className="flex flex-col gap-2">
        <div className="relative w-full h-40">
          <Image src={imageUrl} alt={title} layout="fill" />
        </div>
        <span className="text-xl font-bold">{title}</span>
        <p className="text-base">{description}</p>
      </div>
    </a>
  );
};

export default Resource;
