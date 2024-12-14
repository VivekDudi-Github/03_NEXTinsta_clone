import React from 'react'
import { prisma } from './db'
import Link from 'next/link'
import PostLikeInfo from './PostLikeInfo'
import PostBookMarkInfo  from "./PostBookMarkInfo"
import { sessionFunc } from './action'

async function HomePostsFeed({profiles}) {
  const {profile} = await sessionFunc();
  const posts = await prisma.post.findMany({
    where : {
      creator : {in : profiles.map(p => p.username)}
    }
  })
  

  return (
    <div className='w-full flex flex-col items-center gap-6'>
      {posts.map(async (p ) => {
        const creator = profiles.find(pro => pro.username === p.creator)
        
        const likeCount = await prisma.like.count({
          where : {
            postId : p.id
          }
        })
        const likeStatus = await prisma.like.count({
          where : {
            postId : p.id , 
            username : profile.username ,
          }
        })
        const bookmarkCount = await prisma.bookmark.count({
          where : {
            postId : p.id
          }
        })
        const bookmarkStatus = await prisma.bookmark.count({
          where : {
            postId : p.id , 
            username : profile.username
          }
        })
        

        return (
          <div key={p.id} className='w-full flex flex-col items-center'>
            
            <Link href={"/posts/"+p.id} className='m-2 md:w-1/2 w-full rounded-md overflow-hidden px-4' >
              <img className='w-full rounded-lg shadow-md shadow-black mb-3' src={p.image} alt={p.creator +`post`} />
            </Link>
            <div className='md:w-1/2 w-full px-4 flex justify-between items-center '>
              <Link href={"/user/"+ p.creator} className='flex gap-1 font-bold text-lg'> 
                <img className='rounded-full size-12 object-cover' src={creator.avatar || ""} />
                  {creator.name}
              </Link>
              <div className='flex gap-3 items-center '>
                
                <PostLikeInfo postId={p.id} likes={likeCount} likeStatus={ likeStatus === 1 ? true : false} />
                
                <PostBookMarkInfo postId={p.id} Bookmarks={bookmarkCount} BookmarkStatus={ bookmarkStatus  ? true : false}/>
              </div>
            </div>
            <p className='md:w-1/2 w-full text-left px-4'>
              {p.description}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default HomePostsFeed