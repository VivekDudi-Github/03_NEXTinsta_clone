
import { prisma } from "../../../components/db"
import CommentFormLayout from "../../../components/CommentFormLayout"
import CommentList from "../../../components/CommentList"
import { Suspense } from "react";
import { Bookmark, Heart } from "lucide-react";
import PostLikeInfo from "../../../components/PostLikeInfo"
import {auth} from "../../../../auth"

const SinglePost = async ({params , passedParams}) => {
    const session = await auth() ;
    const profile = await prisma.profile.findFirstOrThrow({
        where : {
            email : session?.user?.email
        }
    }) 
    

    const GetParams =  await params ;
    const {id} =  GetParams || passedParams ;
    
    
    const post = await prisma.post.findFirstOrThrow({
        where : {
            id : id
        }
    })
    const authorProfile = await prisma.profile.findFirstOrThrow({
        where : {
            username : post.creator ,
        }
    })
    const postDate = JSON.stringify(post.createdAt).slice(1 , 11)
    const likeCount = await prisma.like.count({
        where : {
            postId : post.id 
        }
    })

    const likeStatus = await prisma.like.count({
        where : {
            postId : post.id , 
            username : profile.username ,
        }
    })
    
    
    return (
        <> 
        <div className=" grid md:grid-cols-2 w-full gap-4 p-4">
            <div className="w-full h-fit md:sticky top-0 ">
                    <img className="w-full " src={post?.image }/>
                
            </div>


            <div className="">
                <div className="flex">
                    <div>
                        <div className="size-16 rounded-r-full aspect-square overflow-hidden ">
                            <img className="h-full w-full object-cover" src={authorProfile?.avatar || ""} />
                        </div>
                    </div>
                    <div className="ml-1 w-full">
                        
                        <h3 className="font-semibold pt-1 ">
                            {authorProfile?.name || "Kyl"}
                            
                        </h3>
                        
                        <h5 className="text-gray-600 text-xs pb-1" >
                                {authorProfile.username || "@Kyl2"}
                        </h5> 

                        <div className=" w-full bg-gradient-to-br rounded-lg from-gray-700 via-gray-500 to-white p-[2px]">
                            <div className="w-full rounded-md bg-gray-200 p-4  border-gray-300 border-2">
                                <p>
                                    {post?.description} 
                                </p>
                            </div>
                        </div>
                        <div className="text-xs text-gray-400 text-right pt-1"> 
                                    {postDate}                                     
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-between py-2 border-y-2 border-gray-300 my-2">
                    
                    <PostLikeInfo likes={likeCount} postId={post.id} likeStatus= {likeStatus === 1 ? true : false} />
                    <div className=" flex items-center">
                        <button>
                            <Bookmark />
                        </button>
                    </div>
                </div>
                <div className="pt-4">
                    <Suspense >
                        <CommentFormLayout id={id} />
                    </Suspense>
                </div>
                <div>
                    <CommentList postId={id} />
                </div>
            </div>
        </div>
        </>
    )

}

export default SinglePost