import * as z from "zod";

export const schema = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z.string().min(3).max(20),
  username: z.string().min(3).max(20),
  bio: z.string().min(3).max(200),
});