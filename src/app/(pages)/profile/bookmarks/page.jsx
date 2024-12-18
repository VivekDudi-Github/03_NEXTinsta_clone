import { headers } from "next/headers"
import ProfileContent from "../../../components/ProfileContent";
import { sessionFunc } from "../../../components/action";
import { redirect } from "next/navigation";

async function page() {
    const {profile , session} = await sessionFunc() ;
    if(!profile){
        redirect('/settings')
    } 
    return (
        <ProfileContent profile={profile} session={session} path={'/bookmark'} />
  )
}

export default page