"use client"
import {Heart} from "lucide-react"
import {TogglePostLikes} from "../components/action"
import { useRouter } from "next/navigation"
import { useState } from "react"

function PostLikeInfo({likes , postId , likeStatus}) {
  const router = useRouter()

  
  const [newLikeCount , setnewLikeCount] = useState(likes) ;
  const [newLikeStatus , setnewLikeStatus] = useState(likeStatus) ;



  const clickFunc = async() => {
      if(!newLikeStatus){
          setnewLikeCount(newLikeCount + 1)
      }else{
          setnewLikeCount(newLikeCount - 1)
      }
      setnewLikeStatus(!newLikeStatus)
      
      await TogglePostLikes(postId)
      router.refresh() ;
    }

  return (
    <div>
        <div className=" flex justify-start items-center">
            <button
              className="p-2 active:scale-90 duration-200" 
              onClick={async() => await clickFunc()} 
            >  
                    <Heart size={30} className={`${newLikeStatus ? "fill-pink-600 text-pink-600" : ""}`}  /> 
            </button>
                { newLikeCount || ""} {newLikeCount ? `${newLikeCount >1 ? 'likes' : 'like'}` : "" }
        </div>
    </div>
  )
}

export default PostLikeInfo