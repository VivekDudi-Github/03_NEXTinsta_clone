
import { Button, TextArea, TextField } from "@radix-ui/themes"
import { CloudUploadIcon, Upload } from "lucide-react"
import { prisma } from "../../components/db"
import {auth} from "../../../auth"
import { redirect } from "next/navigation";

async function page() {
    const session = await auth() ;
    
  return (
    <div className=" max-w-2xl mx-auto">
       
        <div className="font-bold text-2xl text-center mb-4 ">
            Profile Settings
        </div>

        <form action={async (FormData) => {
            "use server"
            console.log(session.user.email);
            
            
            const result = await prisma.profile.upsert({
                where : { 
                    email : session?.user?.email ,
                }
                ,
                update : {
                    username : FormData.get("username") , 
                    // name :  FormData.get("name") ,
                    // subtitle :  FormData.get("subtitle") , 
                    // bio :  FormData.get("bio")
                } , 
                create : {
                    email : session?.user?.email , 
                    username :  FormData.get("username") ,
                }
            } 
        ) 
            redirect('/profile')
        }}>
            <div className=" flex items-center  gap-6">
                <div>
                    <div className=" size-24 bg-gray-600 rounded-full "></div>
                </div>
                <div>
                    <Button  variant="surface" color="violet" > <CloudUploadIcon/> Change Avatar</Button>
                </div>
            </div>
            <p className=" mt-2 font-bold ">Username :</p>
                <TextField.Root placeholder="username" name="username"/>
            <p className=" mt-2 font-bold ">Name :</p>
                <TextField.Root placeholder="John Dae" name="name"/>
            <p className=" mt-2 font-bold ">Subtitle :</p>
                <TextField.Root placeholder="Graphic Designer" name="subtitle"/>
            <p className=" mt-2 font-bold ">Bio :</p>
                <TextArea name="bio"/>
            <div className=" mt-2 flex justify-center">    
                <Button variant="solid" >Save Settings</Button>
            </div>
        </form>
    </div>
  )
}

export default page