// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not allowed` });
  }

  const data = req.body;
  if (!data.title || !data.description) {
    return res.status(422).json({
      message: `Properties title and description are required`,
    });
  }

  try {
    const { title, description } = data as {
      title: string;
      description: string;
    };
    await prisma.resource.create({
      data: { title, description },
    });

    res.status(201).send({
      message: "Resource created successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong",
    });
  }
}
