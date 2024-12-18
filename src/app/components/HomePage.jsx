import HomeTopRow from "./HomeTopRow"
import HomePostsFeed from "./HomePostsFeed"
import { sessionFunc } from "./action"
import { prisma } from "./db";
import FollowButton from "./FollowButton";
import { Suspense } from "react";
import Preloader from "./Preloader";

async function HomePage() {
    const { profile} = await sessionFunc() ; 
    
    const Followings = await prisma.follow.findMany({
        where : {
            followBy : profile.username 
        } , 
        take : 10
    })

    const profiles = await prisma.profile.findMany({
      where : {
        username : {in : Followings.map( f => f.followTo)}
      }
    })


  return (
    <div className="relative w-full ">
        <HomeTopRow profiles={profiles} />
        <Suspense fallback={<Preloader />}>
          <HomePostsFeed profiles={profiles} />
        </Suspense>
    </div>
  )
}

export default HomePage