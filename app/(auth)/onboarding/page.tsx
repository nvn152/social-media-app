import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
  const user = await currentUser();

  const userInfo = {};

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName,
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Get Started</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile and start posting!
      </p>

      <section
        className="mt-10 bg-dark-2 p-10
      "
      >
        <AccountProfile user={userData} btnText="Continue" />
      </section>
    </main>
  );
}
export default Page;
