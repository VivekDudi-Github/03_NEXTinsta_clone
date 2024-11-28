"use client"
import {Heart} from "lucide-react"
import {TogglePostLikes} from "../components/action"
import { useRouter } from "next/navigation"

function PostLikeInfo({likes , postId , likeStatus}) {
  const Likes = likes
  const router = useRouter()
  return (
    <div>
        <div className=" flex justify-start items-center">
            <button
              className="p-2 active:scale-90 duration-200" 
              onClick={ async() => { 
                        await TogglePostLikes(postId)
                        router.refresh() ;
                }} >  
                    <Heart className={`${likeStatus ? "fill-pink-600 text-pink-600" : ""}`}  /> 
            </button>
                {likes} people liked this post
        </div>
    </div>
  )
}

export default PostLikeInfo