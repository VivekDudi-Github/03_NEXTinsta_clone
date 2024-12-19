"use client"
import {TogglePostBookmarks} from "./action"
import { Bookmark, BookmarkCheck } from 'lucide-react'
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
          setnewBookmarkCount(newBookmarkCount - 1)
      }
      setnewBookmarkStatus(!newBookmarkStatus)
      
      await TogglePostBookmarks(postId)
      router.refresh() ;
    }

  
    return (
     <div>
        <div className=" flex justify-start items-center">
            <button
              className="p-2 active:scale-90 duration-200 flex  items-center" 
              onClick={async() => await clickFunc()} 
            >  
            <Bookmark size={30} className={BookmarkStatus ? 'fill-purple-500 text-purple-500' : ''} />
                    
              {(newBookmarkCount || "") + (newBookmarkCount ? `${newBookmarkCount > 1 ? ' bookmarks' : ' bookmark'}` : "")} 
            </button>
                
        </div>
    </div>
  )
}

export default PostBookMarkInfo