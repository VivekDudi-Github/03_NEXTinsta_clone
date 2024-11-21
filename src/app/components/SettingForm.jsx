"use client"
import { Button, TextArea, TextField } from "@radix-ui/themes"
import { CloudUploadIcon, EraserIcon, Trash2, UserRoundXIcon } from "lucide-react"
import { UpdateFunction } from "../components/action"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export default function SettingForm (  {profile , session} ){
    const router = useRouter() ;
    const fileInputRef = useRef() ;

    const [avatar , setAvatar] = useState(null)
    // const avatar = "https://picsum.photos/id/1/1024/720" 

    return (

        <form action={async (FormData) => {
            await UpdateFunction(FormData , session)
            router.push("/profile")
        }}>
            <div className=" flex items-center  gap-6">
                <div>
                    <div className={ `size-24  rounded-full overflow-hidden flex justify-center  ${!avatar ? "bg-gray-500" : "" } `}>
                        {avatar ? <img className="size-24 object-cover" src={URL.createObjectURL(avatar)} /> : 
                        <UserRoundXIcon size='85' />
                        }
                    </div>
                </div>
                <div>
                    <input className="hidden"
                     type="file" 
                     ref={fileInputRef} 
                     onChange={(e) => setAvatar(e.target.files[0])}
                     />
                     <Button 
                        variant="surface" color="violet" 
                        onClick={(e) => {
                            e.preventDefault();
                            fileInputRef.current?.click()
                        }}
                    > <CloudUploadIcon/> Change Avatar</Button>
                        
                        
                    
                </div>
            </div>
            <p className=" mt-2 font-bold ">Username :</p>
                <TextField.Root placeholder="username" name="username" defaultValue={profile?.username || null }/>
            <p className=" mt-2 font-bold ">Name :</p>
                <TextField.Root placeholder="John Dae" name="name" defaultValue={profile?.name || null}/>
            <p className=" mt-2 font-bold ">Subtitle :</p>
                <TextField.Root placeholder="Graphic Designer" name="subtitle" defaultValue={profile?.subtitle || null}/>
            <p className=" mt-2 font-bold ">Bio :</p>
                <TextArea name="bio" defaultValue={profile?.bio || null}/>
            <div className=" mt-2 flex justify-center">    
                <Button variant="solid" >Save Settings</Button>
            </div>
        </form>
    )
}

