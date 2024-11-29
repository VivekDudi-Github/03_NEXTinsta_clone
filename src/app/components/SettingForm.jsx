"use client"
import { Button, TextArea, TextField } from "@radix-ui/themes"
import { CloudUploadIcon, UserRoundXIcon } from "lucide-react"
import { UpdateProfileFunction } from "../components/action"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { signOut } from "../../auth"

export default function SettingForm (  {profile , session} ){
    const router = useRouter() ;
    const fileInputRef = useRef() ;
    const [LogoutCLick , setLogoutCLick] = useState(false) ;

    const [avatar , setAvatar] = useState(profile?.avatar || null) ;
    const [NewAvatarFile , setNewAvatarFile] = useState(null) ;
    
    const [newAvatarUrl , setnewAvatarUrl]  = useState(null) ;
    const data = new FormData() ; 

    
    useEffect( () => {
        if(!NewAvatarFile){
            return ;
        }
        
        const UploadFunc = async() => {
            console.log("func run");
            
            data.set("file" ,  NewAvatarFile)  ;
            
            const uploadRequest = await fetch("/api/upload" ,  {
                method : "POST" ,
                body : data ,  
            } ) 
            const signedUrl = await uploadRequest.json();
            console.log(signedUrl);
            setnewAvatarUrl(signedUrl) ;
        }
        UploadFunc() ;
    } , [ NewAvatarFile])


    return (

        <form
            className="w-full" 
            action={async (FormData) => {
            const oldurl = profile?.avatar ;
            console.log(newAvatarUrl);
            
            await UpdateProfileFunction(FormData , newAvatarUrl  , oldurl , session)
            router.push("/profile")
        }}>
            <div className=" flex items-center  gap-6">
                <div>
                    <div className={ `size-24  rounded-full overflow-hidden flex justify-center  ${!avatar ? "bg-black" : "" } `}>
                        {avatar || newAvatarUrl ?
                         <img className="size-24 object-cover" 
                            src={
                                newAvatarUrl ? newAvatarUrl : avatar
                        } /> : 
                        <UserRoundXIcon size='85' color="white" />
                        }
                    </div>
                </div>
                <div>
                    <input className="hidden"
                     type="file" 
                     ref={fileInputRef} 
                     onChange={(e) => setNewAvatarFile(e.target.files[0])}
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
            <div className=" mt-2 flex  justify-between">    
                <Button type="submit" variant="solid" >Save Settings</Button>
                <Button onClick={(e) => {
                        e.preventDefault()
                        setLogoutCLick(true)}}
                     variant="surface" color="ruby">Logout</Button>
            </div>
            {LogoutCLick && 
            <div className=" fixed inset-0 -top-12 m-auto  text-white text-center p-4 w-96 h-32 rounded-lg 
                             bg-gradient-to-br from-black via-gray-800 to-slate-400   ">
                    <p className="p-1 text-lg font-medium">
                    Do you really want to logout?
                    </p>
                    <div className=" p-4 pt-2 w-full  flex justify-around">
                        <button 
                            onClick={() => setLogoutCLick(false)}
                            className=" rounded-xl p-3 bg-white text-black ">
                            Cancel
                        </button>
                        <button 
                            onClick={() => setLogoutCLick(false)}
                            className=" rounded-xl p-3 bg-black text-white ">
                            Logout
                        </button>
                    </div>
            </div>
            }
            
        </form>
    )
}

