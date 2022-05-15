// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Resource } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type ResourceBody = Pick<Resource, "title" | "description">;

type ResponseBody = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (req.method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not allowed` });
  }

  try {
    const data = req.body;

    if (!data.title || !data.description) {
      return res.status(422).json({
        message: `Properties title and description are required`,
      });
    }

    if (!req.query.id) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    const id = req.query.id as string;
    const existingResource = await prisma.resource.findUnique({
      where: { id },
    });
    if (!existingResource) {
      return res.status(404).json({
        message: "Resource not found",
      });
    }

    const { title, description } = data as ResourceBody;
    await prisma.resource.update({
      where: { id },
      data: { title, description },
    });

    res.status(200).send({
      message: "Resource updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
}
