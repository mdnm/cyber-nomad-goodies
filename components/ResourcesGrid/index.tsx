import { Resources } from "@prisma/client";
import React from "react";
import resourceBg from "../../public/resource-bg.png";
import Resource from "../Resource";

type Props = {
  resources: Resources[];
};

const ResourcesGrid = ({ resources }: Props) => {
  return (
    <div className="flex flex-wrap gap-7">
      {resources.map((resource) => (
        <Resource
          key={resource.id}
          {...resource}
          link="#"
          imageUrl={resourceBg.src}
        />
      ))}
    </div>
  );
};

export default ResourcesGrid;
