import { fetchUserPosts } from "@/lib/actions/user-action";
import { redirect } from "next/navigation";
import PostCard from "../cards/PostCard";

interface PostsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const PostsTab = async ({
  currentUserId,
  accountId,
  accountType,
}: PostsTabProps) => {
  let result = await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.posts.map((post: any) => (
        <PostCard
          key={post._id}
          id={post._id}
          currentUserId={currentUserId}
          parentId={post.parentId}
          content={post.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: post.author.name,
                  image: post.author.image,
                  id: post.author.id,
                }
          }
          community={post.community}
          createdAt={post.createdAt}
          comments={post.children}
        />
      ))}
    </section>
  );
};

export default PostsTab;
