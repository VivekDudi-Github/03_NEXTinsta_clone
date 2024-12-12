"use client"
import {UserCheck2Icon, UserPlus2} from "lucide-react"
import {FollowFunc} from "./action"
import { useRouter } from "next/navigation"
import { useState } from "react"

function FollowButton({username , followingStatus}) {
  const router = useRouter() ;
  
  const [followState , setFOllowState] = useState(followingStatus)
  
  
  return (
    <button 
      className=" min-w-32 my-2 flex items-center justify-center gap-1 rounded-l-full p-4 py-[2px]  text-sm   font-medium text-white
               active:scale-90 duration-200"

      onClick={ async() => {
            setFOllowState(!followState) ;
            await FollowFunc(username) ;
            router.refresh()  ; 
        }}
    >   
      {followState ? 
        <UserCheck2Icon /> 
        :
        <UserPlus2 />  
      }
        Follow
    </button>
  )
}

export default FollowButton