import { formatDistanceToNow } from "date-fns"
import { prisma } from "./db"

async function CommentList({postId}) {
  const comments = await prisma.comment.findMany({
    where : {
        postId : postId  
    } , 
    take : 10 
  }) 
  
  const FetchAuthorProfile = async(username) => {
    const authoreProfile = await prisma.profile.findFirstOrThrow({
        where : {
            username : username
        } , 
        select : {
            avatar : true  , 
            name : true 
        }
    })
    return authoreProfile
    }

    return (
        <>
            {comments.map( async( comment , index ) => {
                const profile = await FetchAuthorProfile( comment.username)
                const {name , avatar} = profile ;
                return (
                    <div key={index} className="flex mt-2">
                        <div>
                                <div className="size-12 rounded-full aspect-square overflow-hidden border-2 border-black">
                                    <img src={ avatar ||  ""} />
                                </div>
                            </div>
                        <div className="ml-1 ">
                            <div>
                                <h3 className="font-semibold pt-1 ">
                                    {name || "Err :Name not available"} 
                                </h3>   

                                <h5 className="text-gray-600 text-xs pb-1 " >
                                        @{ comment.username}
                                </h5>     
                            </div>
                        

                            <div>
                                <div className=" bg-gradient-to-br rounded-lg from-gray-700 via-gray-500 to-white p-[2px]">
                                    <div className=" rounded-md bg-gray-200 p-4 border-gray-300 border-2">
                                        <p>
                                            {comment.text} "Lorem ipsum dolor sit amet consectetur WOrds length limit 88
                                        </p>
                                    </div>
                                </div>
                                <div className="text-xs text-gray-400 text-right"> 
                                    {formatDistanceToNow(comment.createdAt)} ago
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
  )
}

export default CommentList