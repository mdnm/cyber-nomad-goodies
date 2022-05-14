import { Resource as ResourceSchema } from "@prisma/client";
import React from "react";
import resourceBg from "../../public/resource-bg.png";
import Resource from "../Resource";

type Props = {
  resources: ResourceSchema[];
};

const ResourcesGrid = ({ resources }: Props) => {
  return (
    <div className="flex flex-wrap gap-7">
      {resources.map((resource) => (
        <Resource
          key={resource.id}
          link="#"
          imageUrl={resourceBg.src}
          {...resource}
        />
      ))}
    </div>
  );
};

export default ResourcesGrid;
