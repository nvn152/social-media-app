"use server";

import { connectToDB } from "@/lib/mongoose";
import Post from "@/lib/models/post-model";
import User from "@/lib/models/user-model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  commuintyId: null;
  path: string;
}

export async function createPost({ text, author, commuintyId, path }: Params) {
  try {
    connectToDB();

    const createdPost = await Post.create({
      text,
      author,
      community: null,
      path,
    });

    // update the user model

    await User.findByIdAndUpdate(author, {
      $push: {
        posts: createdPost._id,
      },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
