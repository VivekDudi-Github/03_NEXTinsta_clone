import { prisma } from "../../../components/db";
import ProfileContent from "../../../components/ProfileContent";
import { auth } from "../../../../auth";
import { redirect } from "next/dist/server/api-utils";

async function page({params}) {
    let {username} = await params ;
    username = decodeURIComponent(username) ;

    const session = await auth() ;
    const email = session?.user?.email

    const profile = await prisma.profile.findFirst({
        where : {
            username : username 
        }
    })
    if(email === profile.email){
        redirect("/profile")
    }
    
  return (
    <ProfileContent profile={profile} />
  )
}

export default page