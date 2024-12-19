import { prisma } from "./db"
import PostGrid from "./PostGrid"

async function ProfilePosts({profile , path}) {
    
let posts ;

    const highlightPath = path.includes('highlight') ; 
    const bookmarkPath = path.includes('bookmark') ;
    const mainPath = (!highlightPath && !bookmarkPath) ; 

    if(mainPath){        
    posts = await prisma.post.findMany({
        where : {
            creator : profile?.username
            }
        })
    }else if(bookmarkPath){
        
    const BookmarkPosts = await prisma.bookmark.findMany({
        where : {
            username : profile?.username
            }
        })

        posts = await prisma.post.findMany({
            where : {
                id : { in : BookmarkPosts.map( p => p.postId)}
            }
        })

    }
    else if(highlightPath){
    const BookmarkPost = await prisma.bookmark.findMany({
        where : {
            username : profile?.username
        }
    })
        
    posts = await prisma.post.findMany({
        where : {
            id : { in : BookmarkPost.map( p => p.postId)},
            creator : profile?.username
        }
    })
    }
    

    return (
        <div className="max-w-4xl mx-auto">
            <PostGrid  post = {posts}/>
        </div>
  )
}

export default ProfilePosts