"use client"
import { Button, TextArea, TextField } from "@radix-ui/themes"
import { CloudUploadIcon, UserRoundXIcon } from "lucide-react"
import { UpdateProfileFunction } from "../components/action"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function SettingForm (  {profile , session} ){
    const router = useRouter() ;
    const fileInputRef = useRef() ;
    const isFirstRender = useRef(true) ; 

    const [avatar , setAvatar] = useState(profile?.avatar || null) ;
    const [newAvatarUrl , setnewAvatarUrl]  = useState(null) ;
    const data = new FormData() ; 

    
    useEffect( () => {
        if(isFirstRender.current){
            isFirstRender.current = false ;
            return ;
        }
        
        const UploadFunc = async() => {
            data.set("file" ,  avatar)  ;
            
            const uploadRequest = await fetch("/api/upload" ,  {
                method : "POST" ,
                body : data ,  
            } ) 
            const signedUrl = await uploadRequest.json();
            console.log(signedUrl);
            
            setnewAvatarUrl(signedUrl) ;
            console.log(newAvatarUrl );
            
        }
        UploadFunc() ;
    } , [ avatar])


    return (

        <form action={async (FormData) => {
            const oldurl = profile?.avatar
            await UpdateProfileFunction(FormData , newAvatarUrl  , oldurl , session)
            router.push("/profile")
        }}>
            <div className=" flex items-center  gap-6">
                <div>
                    <div className={ `size-24  rounded-full overflow-hidden flex justify-center  ${!avatar ? "bg-black" : "" } `}>
                        {avatar ?
                         <img className="size-24 object-cover" 
                            src={
                                typeof avatar === "string" ? 
                                avatar : URL.createObjectURL(avatar) 
                        } /> : 
                        <UserRoundXIcon size='85' color="white" />
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

