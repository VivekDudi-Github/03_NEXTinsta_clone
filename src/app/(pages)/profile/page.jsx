
import { prisma } from "../../components/db";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import ProfileContent from "../../components/ProfileContent"


export default async function() {
    const session = await auth()
    const email = session?.user?.email ;

    if(!email){
        redirect("/")
    }

    const profile = await prisma.profile.findFirst({
        where : {
            email : email
        }
    })
    
    
    if(!profile){
        redirect("/settings")
    }

    
    
    return (
      <>
        <ProfileContent session={session} path={'/profile'} profile={profile}/>
      </>
    )
}