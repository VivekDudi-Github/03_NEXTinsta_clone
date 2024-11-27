
import { prisma } from "../../../components/db"
import CommentFormLayout from "../../../components/CommentFormLayout"
import CommentList from "../../../components/CommentList"
import { Suspense } from "react";


const SinglePost = async ({params}) => {
    const id = await params.id
    
    const post = await prisma.post.findFirstOrThrow({
        where : {
            id : id
        }
    })
    const authorProfile = await prisma.profile.findFirstOrThrow({
        where : {
            username : post.username ,
        }
    })
// const post = "" ;
// const authorProfile = "" ;

    return (
        <>
        <div className=" grid md:grid-cols-2 w-full gap-4 p-4">
            <div className="w-full border-2 border-black">
                <img className="w-full" src={post?.image }/>
            </div>


            <div className="">
                <div className="flex">
                    <div>
                        <div className="size-16 rounded-r-full aspect-square overflow-hidden ">
                            <img src={authorProfile?.avatar || ""} />
                        </div>
                    </div>
                    <div className="ml-1 ">
                        
                        <h3 className="font-semibold pt-1 ">
                            {authorProfile?.name || "Kyl"}
                            
                        </h3>
                        
                        <h5 className="text-gray-600 text-xs pb-1" >
                                {authorProfile.username || "@Kyl2"}
                        </h5> 

                        <div className=" bg-gradient-to-br rounded-lg from-gray-700 via-gray-500 to-white p-[2px]">
                            <div className=" rounded-md bg-gray-200 p-4 border-gray-300 border-2">
                                <p>
                                    {post?.description|| "Post @2"} Lorem ipsum dolor sit amet consectetur possimus optio quaerat commodi consequatur.
                                </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="pt-4">
                    <Suspense >
                        <CommentFormLayout id={id} />
                    </Suspense>
                </div>
                <div>
                    <CommentList id={id} />
                </div>
            </div>

        </div>
        </>
    )

}

export default SinglePost