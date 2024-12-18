import { prisma } from "./db"
import PostGrid from "./PostGrid"

async function ProfilePosts({profile , path}) {
    console.log(path);
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
        
    posts = await prisma.bookmark.findMany({
        where : {
            username : profile?.username
            }
        })

    }
    else if(highlightPath){
        
    posts = await prisma.post.findMany({
        where : {
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