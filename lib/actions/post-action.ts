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

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();

    //Calculate number of posts to skit depending on which page we are on
    const skipAmount = (pageNumber - 1) * pageSize;

    // fetch posts that have no parent
    const postsQuery = Post.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostsCount = await Post.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return {
      posts,
      isNext,
    };
  } catch (error: any) {
    console.log(error.message);
  }
}
