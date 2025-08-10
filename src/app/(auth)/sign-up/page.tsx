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

import { SignupView } from "@/modules/auth/ui/views/sign-up-view";
const page = () => {

    return (
        <SignupView />
    );
}
export default page;
