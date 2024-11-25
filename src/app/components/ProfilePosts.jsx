import { prisma } from "./db"
import PostGrid from "./PostGrid"

async function ProfilePosts(profile) {
    const posts = await prisma.post.findMany({
                    where : {
                        creator : profile?.username
                        }
                    })
    return (
        <>
            <PostGrid  post = {posts}/>
        </>
  )
}

export default ProfilePosts