import { Resources } from "@prisma/client";
import Image from "next/image";
import React from "react";

type Props = Omit<Resources, "createdAt" | "updatedAt"> & {
  link: string;
  imageUrl: string;
};

const Resource = ({ title, description, imageUrl, link }: Props) => {
  return (
    <a href={link}>
      <div className="flex flex-col gap-2 max-w-xs">
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
