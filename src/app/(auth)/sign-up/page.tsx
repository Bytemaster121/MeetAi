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

import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
const page = () => {

    return (
        <SignUpView />
    );
}
export default page;
