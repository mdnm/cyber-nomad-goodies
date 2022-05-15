// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Resource } from "@prisma/client";
import { createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type ResourceBody = Pick<Resource, "title" | "description"> & {
  image: string;
};

type ResponseBody = {
  message: string;
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_PUBLIC_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("There is't no supabase config on ENV");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not allowed` });
  }

  try {
    const data = req.body;
    if (!data.title || !data.description || !data.image) {
      return res.status(422).json({
        message: `Properties title, description and image are required`,
      });
    }

    const { title, description, image } = data as ResourceBody;

    const SUPABASE_BUCKET = process.env.SUPABASE_PUBLIC_BUCKET;
    if (!SUPABASE_BUCKET) {
      throw new Error("There is't no supabase config on ENV");
    }

    const contentTypeMatches = image.match(/data:(.*);base64/);
    const imageStringWithoutBase64 = image.split("base64,");

    if (!contentTypeMatches || !imageStringWithoutBase64) {
      return res.status(422).json({
        message: "Your file is invalid",
      });
    }

    const contentType = contentTypeMatches[1];
    const [fileType, fileExtension] = contentType.split("/");
    if (fileType !== "image") {
      return res.status(422).json({
        message: "Only images are accepted",
      });
    }

    const base64FileData = imageStringWithoutBase64[1];
    const filename = nanoid();
    const filepath = `${filename}.${fileExtension}`;

    const { data: storageData, error: storageError } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(filepath, decode(base64FileData), {
        contentType,
        upsert: true,
      });

    if (storageError || !storageData) {
      return res.status(500).json({
        message: "Something went wrong with the image upload",
      });
    }

    const { publicURL } = supabase.storage
      .from(SUPABASE_BUCKET)
      .getPublicUrl(filepath);

    if (!publicURL) {
      return res.status(500).json({
        message: "Something went wrong with the image upload",
      });
    }

    await prisma.resource.create({
      data: { title, description, imageUrl: publicURL },
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
