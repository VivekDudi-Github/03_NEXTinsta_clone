import {prisma} from './db'
import Link from 'next/link'
import PostGrid from './PostGrid'

export default async function SearchResults({query}) {

  const profiles = await prisma.profile.findMany({
    where : {
      OR : [
        {username : { contains : query}} , 
        {name : { contains : query }} , 
      ]
    } , 
    take : 10 
  })

  const posts = await prisma.post.findMany({
    where : {
      OR : [
        {description : { contains : query}} ,  
      ]
    } , 
    take : 10
  })

  return (
    <div>
        <h1 className=' my-2 '>
          Search results for {query}
        </h1>
        <h2> 
          <div className=' py-2 flex gap-2 overflow-scroll'>
          { profiles.length > 0 ? 
            profiles.map((profile , index) => {
              return (
                <Link
                  href={`user/${profile.username}`} 
                  key={index}  
                  title={`@${profile.username}`}  
                  className=' text-gray bg-gradient-to-r from-black via-slate-600 to-slate-200 rounded  pr-4'
                >
                  <div  className='flex '>
                    <div className='size-20 overflow-hidden rounded-r-full '>
                      <img className='object-cover size-20 rounded-l-md ' src={profile.avatar} />
                    </div>
                    <div className='font-medium text-wrap max-w-24 pl-2'>
                     <h3 className='text-base'>
                      {profile.name}
                     </h3>
                     <h4 className='text-gray-700 font-normal text-xs '>
                      @{profile.username.length < 15 ? 
                          profile.username : 
                          profile.username.slice(0 , 15)+'....'
                      }
                     </h4>
                    </div>
                  </div>
                </Link>
              )
            }) :
            <div>
              No profiles found
            </div>
          }
          </div>
        </h2>
        <PostGrid post={posts} />

    </div>
  )
}
