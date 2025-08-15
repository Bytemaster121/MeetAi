// import { Card } from "@/components/ui/card";
// const page = () =>{
//     return (
        
//         <Card>
//             Sign In Page  
//         </Card>
//     )
// }

// export default page;

// //https://localhoast:3000/auth/sign-in (before the change)

// ///by using grouping the auth pages under a folder named (auth), we can create a route that is more organized and easier to manage.
// //This will create a route at /auth/sign-in, which is more descriptive and easier to

import { auth } from "@/lib/auth";
import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import { HomeView } from "@/modules/Home/ui/Views/home-View";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const page =  async() => {
    const session = await auth.api.getSession({
        headers : await headers(),
    
      });
      if(!! session ){
        redirect("/")
      }

    return <SignInView/>
}  

export default page;

