"use client"
import { Button, TextArea, TextField } from "@radix-ui/themes"
import { CloudUploadIcon, Upload } from "lucide-react"

function page() {
  return (
    <div className=" max-w-2xl mx-auto">
       
       <div className="font-bold text-2xl text-center mb-4 ">
            Profile Settings
       </div>
        <form action="">
            <div className=" flex items-center  gap-6">
                <div>
                    <div className=" size-24 bg-gray-600 rounded-full "></div>
                </div>
                <div>
                    <Button  variant="surface" color="violet" > <CloudUploadIcon/> Change Avatar</Button>
                </div>
            </div>
            <p className=" mt-2 font-bold ">Username :</p>
                <TextField.Root placeholder="username"/>
            <p className=" mt-2 font-bold ">Name :</p>
                <TextField.Root placeholder="John Dae"/>
            <p className=" mt-2 font-bold ">Subtitle :</p>
                <TextField.Root placeholder="Graphic Designer"/>
            <p className=" mt-2 font-bold ">Bio :</p>
                <TextArea/>
            <div className=" mt-2 flex justify-center">    
                <Button variant="solid" >Save Settings</Button>
            </div>
        </form>
    </div>
  )
}

export default page