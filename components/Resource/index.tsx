import { Resource } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = Omit<Resource, "createdAt" | "updatedAt"> & {
  imageUrl: string;
};

const Resource = ({ id, title, description, imageUrl }: Props) => {
  return (
    <Link href={`/resources/${id}`} passHref>
      <a className="w-full max-w-xs">
        <div className="flex flex-col gap-2">
          <div className="relative w-full h-40">
            <Image src={imageUrl} alt={title} layout="fill" />
          </div>
          <span className="text-xl font-bold">{title}</span>
          <p className="text-base">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default Resource;
