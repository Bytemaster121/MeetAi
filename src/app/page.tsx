import { session } from "@/db/schema";
import { auth } from "@/lib/auth";
import { HomeView } from "@/modules/Home/ui/Views/home-View";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";

const page = async()=>{
  // const session  = await auth.api.getSession({
  //   headers : await headers(),
  //  });
  //  if(!! session ) {
  //   redirect("/sign-in");
  // }
  return <HomeView />;

};
export default page;