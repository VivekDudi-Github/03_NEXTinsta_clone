"use client"
import { Button, TextArea, TextField } from "@radix-ui/themes"
import { CloudUploadIcon, UserRoundXIcon } from "lucide-react"
import { UpdateProfileFunction } from "../components/action"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { LogOut } from "../components/action"

<<<<<<< HEAD
export default function SettingForm (  {profile , email} ){
=======
export default function SettingForm (  {profile , email}){
>>>>>>> 19d4ca9c78be93b376223c0b5bf6b7ce54c546cf
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
            
            await UpdateProfileFunction(FormData , newAvatarUrl  , oldurl , email)
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
                     required
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
                <TextField.Root placeholder="username" name="username" required defaultValue={profile?.username || null }/>
            <p className=" mt-2 font-bold ">Email :</p>
                <TextField.Root placeholder="email123@email.com" name="subtitle" readOnly value={ email || null}/>
            <p className=" mt-2 font-bold ">Name :</p>
                <TextField.Root placeholder="John Dae" name="name" required defaultValue={profile?.name || null}/>
            <p className=" mt-2 font-bold ">Subtitle :</p>
                <TextField.Root placeholder="Graphic Designer" name="subtitle" required defaultValue={profile?.subtitle || null}/>
            <p className=" mt-2 font-bold ">Bio :</p>
                <TextArea name="bio" required defaultValue={profile?.bio || null}/>
            <div className=" mt-2 flex  justify-between">    
                <button 
                className="rounded-md font-medium pb-[2px] pt-[1px] p-3 text-base text-white bg-gradient-to-tr from-slate-800 via-slate-700 to-slate-400 "
                type="submit" 
                >Save Settings</button>
                <button 
                className="rounded-md py-1 p-2 font-medium text-white bg-slate-800"
                onClick={(e) => {
                        e.preventDefault()
                        setLogoutCLick(true)}}
                     variant="surface" color="ruby">Logout</button>
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
                            onClick={ async() => {
                                await LogOut() ;
                                setLogoutCLick(false) ;
                                router.push('/')
                            }}
                            className=" rounded-xl p-3 bg-black text-white ">
                            Logout
                        </button>
                    </div>
            </div>
            }
            
        </form>
    )
}

