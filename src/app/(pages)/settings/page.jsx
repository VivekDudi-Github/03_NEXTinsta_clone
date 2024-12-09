"use server"
import { prisma } from "../../components/db";
import {auth} from "../../../auth";
import SettingForm from  "../../components/SettingForm";

async function page() {
    const session = await auth() ;
    
    const profile = await prisma.profile.findFirst({
        where : { 
            email : session?.user?.email ,
        } 
    })

    
  return (
    <div className=" max-w-2xl mx-auto"> 
       
        <div className="font-bold text-2xl text-center mb-4 ">
            Profile Settings
        </div>

<<<<<<< HEAD:src/app/(pages)/settings/page.jsx
        <SettingForm  email= {session?.user?.email} profile = {profile || ""}/>
=======
        <SettingForm  email= {session?.users?.email} profile = {profile || "" }/>
>>>>>>> 19d4ca9c78be93b376223c0b5bf6b7ce54c546cf:src/app/(routes)/settings/page.jsx
    </div>
  )
}

export default page
