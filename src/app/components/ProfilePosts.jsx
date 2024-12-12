import { prisma } from "./db"
import PostGrid from "./PostGrid"

async function ProfilePosts({profile}) {
    
    const posts = await prisma.post.findMany({
                    where : {
                        creator : profile?.username
                        }
                    })
    return (
        <div className="max-w-4xl mx-auto">
            <PostGrid  post = {posts}/>
        </div>
  )
}

export default ProfilePosts