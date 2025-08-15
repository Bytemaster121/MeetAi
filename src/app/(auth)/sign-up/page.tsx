// import { Card } from "@/components/ui/card";

// const page = () =>{
//     return (
//        <Card>
//         sign Up Page
//        </Card>
//     );
// }

// export default page;

// //https://localhoast:3000/sign-up

import { auth } from "@/lib/auth";
import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
const page =  async() => {
     const session = await auth.api.getSession({
        headers : await headers(),
    
      });
      if(!! session ){
        redirect("/")
      }
    return (
        <SignUpView />
    );
}
export default page;
