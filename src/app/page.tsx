import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/Home/ui/Views/home-View";
import { redirect } from "next/navigation"; // ✅ Correct import
import { headers } from "next/headers";

const page = async () => {
  const session = await auth.api.getSession({
    headers: headers(), // No need to await headers()
  });

  if (!session) {
    redirect("/sign-in"); // ✅ This will now work
  }

  return <HomeView />;
};

export default page;