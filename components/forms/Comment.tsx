"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";

import React, { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";

import { updateUser } from "@/lib/actions/user-action";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import { addCommentToPost } from "@/lib/actions/post-action";
import { CommentValidation } from "@/lib/validations/post";

// import { createPost } from "@/lib/actions/post-action";

interface Props {
  postId: string;
  currentUserImage: string;
  currentUserId: string;
}

const Comment = ({ postId, currentUserImage, currentUserId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      post: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToPost(
      postId,
      values.post,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };
  return (
    <Form {...form}>
      <form className="comment-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImage}
                  alt="Current User Profile Pic"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Comment
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
