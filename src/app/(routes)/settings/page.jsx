"use server"
import { prisma } from "../../components/db";
import {auth} from "../../../auth";
import { redirect } from "next/navigation";
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

        <SettingForm  email= {session?.users?.email} profile = {profile || "" }/>
    </div>
  )
}

export default page
