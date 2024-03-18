import * as z from "zod";

export const PostValidation = z.object({
  post: z.string().min(1),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  post: z.string().min(1),
});
