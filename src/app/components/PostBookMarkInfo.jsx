"use client"
import {TogglePostBookmarks} from "./action"
import { Bookmark } from 'lucide-react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function PostBookMarkInfo({Bookmarks , BookmarkStatus , postId}) {
  const router = useRouter() ;

  
  const [newBookmarkCount , setnewBookmarkCount] = useState(Bookmarks) ;
  const [newBookmarkStatus , setnewBookmarkStatus] = useState(BookmarkStatus) ;



  const clickFunc = async() => {
      if(!newBookmarkStatus){
          setnewBookmarkCount(newBookmarkCount + 1)
      }else{
          setnewBookmarkStatus(newBookmarkCount - 1)
      }
      setnewBookmarkStatus(!newBookmarkStatus)
      
      await TogglePostBookmarks(postId)
      router.refresh() ;
    }

  
    return (
     <div>
        <div className=" flex justify-start items-center">
            <button
              className="p-2 active:scale-90 duration-200" 
              onClick={async() => await clickFunc()} 
            >  
                    <Bookmark size={30} className={`${newBookmarkStatus ? "fill-pink-600 text-pink-600" : ""}`}  /> 
            </button>
                {newBookmarkCount} {newBookmarkCount ? "bookmarks" : ""} 
        </div>
    </div>
  )
}

export default PostBookMarkInfo