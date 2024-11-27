import { prisma } from "./db"

async function CommentList({postId}) {
  const comments = await prisma.comment.findMany({
    where : {
        postId : postId  
    } , 
    take : 10 
  }) 
  
  const FetchAuthorsAvatar = async(username) => {
    const authoreProfile = await prisma.profile.findFirstOrThrow({
        where : {
            username : username
        } , 
        select : {
            avatar : true 
        }
    })
    return authoreProfile.avatar
    }

    return (
        <>
            {comments.map( async( comment , index ) => {
                return (
                    <div key={index} className="flex">
                        <div>
                                <div className="size-12 rounded-full aspect-square overflow-hidden border-2 border-black">
                                    <img src={  await FetchAuthorsAvatar(comment.username)  ||  ""} />
                                </div>
                            </div>
                        <div className="ml-1 ">
                        
                            <h5 className="text-gray-600 font-bold text-base p-1" >
                                    { comment.username}
                            </h5> 

                            <div className=" bg-gradient-to-br rounded-lg from-gray-700 via-gray-500 to-white p-[2px]">
                                <div className=" rounded-md bg-gray-200 p-4 border-gray-300 border-2">
                                    <p>
                                        {comment.text} "Lorem ipsum dolor sit amet consectetur possimus optio quaerat commodi consequatur."
                                        WOrds length limit 88
                                    </p>
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