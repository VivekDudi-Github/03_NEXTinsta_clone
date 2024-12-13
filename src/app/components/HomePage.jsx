import HomeTopRow from "./HomeTopRow"
import HomePostsFeed from "./HomePostsFeed"
import { sessionFunc } from "./action"
import { prisma } from "./db";

async function HomePage() {
    const {session ,profile} = await sessionFunc() ; 
    
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
    <div>
        <HomeTopRow profiles={profiles} />
        <HomePostsFeed profiles={profiles} />
    </div>
  )
}

export default HomePage